import * as React from "react";
import find from "lodash/find";
import BigNumber from "bignumber.js";
import { rawToRai } from "components/utils";
import { PreferencesContext } from "api/contexts/Preferences";
import { KnownAccountsContext } from "api/contexts/KnownAccounts";

import type { Transaction } from "types/transaction";

enum Topic {
  CONFIRMATION = "confirmation",
}

interface MessageData {
  message: Transaction;
  time: string;
  topic: Topic;
}

// Display less transactions on mobile
const MAX_RECENT_TRANSACTIONS: number = window.innerWidth <= 768 ? 10 : 15;

let ws: WebSocket | undefined;
let isForcedClosed = false;
let isMounted: boolean = false;

const useSocket = () => {
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [recentTransactions, setRecentTransactions] = React.useState<
    Transaction[]
  >([]);
  const {
    hideTransactionsUnderOne,
    disableLiveTransactions,
  } = React.useContext(PreferencesContext);
  const { knownAccounts } = React.useContext(KnownAccountsContext);

  React.useEffect(() => {
    function visibilityChange() {
      if (document.visibilityState !== "visible") {
        isForcedClosed = true;
        ws?.close();
      } else if (!document.getElementById("live-transactions-disabled")) {
        isForcedClosed = false;
        connect();
      }
    }

    isMounted = true;
    window.addEventListener("visibilitychange", visibilityChange);

    return () => {
      isMounted = false;
      window.removeEventListener("visibilitychange", visibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (disableLiveTransactions) {
      isForcedClosed = true;
      ws?.close();
    } else {
      connect();
    }

    return () => {
      isForcedClosed = true;
      ws?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableLiveTransactions]);

  React.useEffect(() => {
    if (!ws) return;
    ws.onmessage = onMessage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideTransactionsUnderOne]);

  const onMessage = React.useCallback(
    (msg: MessageEvent) => {
      try {
        const { message, topic }: MessageData = JSON.parse(msg.data);

        if (topic === Topic.CONFIRMATION) {
          if (
            hideTransactionsUnderOne &&
            ["send", "receive"].includes(message.block.subtype) &&
            new BigNumber(rawToRai(message.amount)).toNumber() < 1
          ) {
            return;
          }

          message.timestamp = Date.now();
          message.alias = find(
            knownAccounts,
            ({ account: knownAccount }) => knownAccount === message.account,
          )?.alias;

          setRecentTransactions(prevRecentTransactions =>
            [message, ...prevRecentTransactions].slice(
              0,
              MAX_RECENT_TRANSACTIONS,
            ),
          );
        }
      } catch (_e) {
        // silence error
      }
    },
    [hideTransactionsUnderOne, knownAccounts],
  );

  const connect = React.useCallback(() => {
    isForcedClosed = false;
    setIsConnected(false);
    ws = new WebSocket("wss://www.bananolooker.com/ws");

    ws.onopen = () => {
      setIsError(false);
      setIsConnected(true);

      const confirmation_subscription = {
        action: "subscribe",
        topic: Topic.CONFIRMATION,
      };

      ws?.send(JSON.stringify(confirmation_subscription));
    };

    ws.onclose = () => {
      ws = undefined;
      if (!isMounted) return;
      setIsConnected(false);
      if (isForcedClosed) return;
      setTimeout(() => {
        connect();
      }, 1000);
    };

    ws.onerror = () => {
      setIsError(true);
    };

    ws.onmessage = onMessage;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMessage]);

  return {
    recentTransactions,
    isConnected,
    isError,
  };
};

export default useSocket;
