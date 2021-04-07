import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
// import { Pie } from "@antv/g2plot";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BigNumber from "bignumber.js";
import { Theme, PreferencesContext } from "api/contexts/Preferences";
import { RepresentativesContext } from "api/contexts/Representatives";
import { ConfirmationQuorumContext } from "api/contexts/ConfirmationQuorum";
import { DelegatorsContext } from "api/contexts/Delegators";
import QuestionCircle from "components/QuestionCircle";
import { rawToRai, TwoToneColors } from "components/utils";
import { KnownAccountsContext } from "api/contexts/KnownAccounts";

const { Title } = Typography;

const Representatives = () => {
  const { t } = useTranslation();
  const [
    isIncludeOfflineRepresentatives,
    setIsIncludeOfflineRepresentatives,
  ] = React.useState(true);
  const isSmallAndLower = !useMediaQuery("(min-width: 576px)");
  const { theme } = React.useContext(PreferencesContext);
  const {
    representatives,
    isLoading: isRepresentativesLoading,
  } = React.useContext(RepresentativesContext);

  const {
    confirmationQuorum: {
      online_weight_quorum_percent: onlineWeightQuorumPercent = 0,
      online_weight_minimum: onlineWeightMinimum = 0,
      online_stake_total: onlineStakeTotal = 0,
      peers_stake_total: peersStakeTotal = 0,
      principal_representative_min_weight: principalRepresentativeMinWeight = 0,
    },
    isLoading: isConfirmationQuorumLoading,
  } = React.useContext(ConfirmationQuorumContext);

  const { knownAccounts } = React.useContext(KnownAccountsContext);
  const {
    delegators: allDelegators,
    getDelegators,
    isLoading,
  } = React.useContext(DelegatorsContext);

  // const principalRepresentatives = principalRepresentativeMinWeight
  //   ? representatives?.filter(
  //       ({ weight }) => weight >= principalRepresentativeMinWeight,
  //     )
  //   : undefined;

  const confirmationQuorumSkeletonProps = {
    active: true,
    paragraph: false,
    loading: isConfirmationQuorumLoading,
  };

  const representativesSkeletonProps = {
    active: true,
    paragraph: false,
    loading: isRepresentativesLoading,
  };

  React.useEffect(() => {
    getDelegators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row gutter={[{ xs: 6, sm: 12, md: 12, lg: 12 }, 12]}>
        <Col xs={24} md={12}>
          <Title level={3}>{t("menu.representatives")}</Title>
          <Card
            size="small"
            bordered={false}
            className="detail-layout"
            style={{ marginBottom: "12px" }}
          >
            <Row gutter={6}>
              <Col xs={24} sm={12} xl={10}>
                {t("common.representatives")}
                <Tooltip
                  placement="right"
                  title={t("tooltips.representatives")}
                >
                  <QuestionCircle />
                </Tooltip>
              </Col>
              <Col xs={24} sm={12} xl={14}>
                <Skeleton {...representativesSkeletonProps}>
                  {representatives?.length || 0}
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={12} xl={10}>
                {t("pages.representatives.onlineRepresentatives")}
              </Col>
              <Col xs={24} sm={12} xl={14}>
                <Skeleton {...representativesSkeletonProps}>
                  {representatives.filter(({ isOnline }) => isOnline)?.length ||
                    0}
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={12} xl={10}>
                {t("common.principalRepresentatives")}
                <Tooltip
                  placement="right"
                  title={t("tooltips.principalRepresentatives", {
                    principalRepresentativeMinWeight,
                  })}
                >
                  <QuestionCircle />
                </Tooltip>
              </Col>
              <Col xs={24} sm={12} xl={14}>
                <Skeleton {...representativesSkeletonProps}>
                  {
                    representatives.filter(({ isPrincipal }) => isPrincipal)
                      ?.length
                  }
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={12} xl={10}>
                <>
                  {t("pages.representatives.onlinePrincipalRepresentatives")}
                  <Tooltip
                    placement="right"
                    title={t("tooltips.onlinePrincipalRepresentatives")}
                  >
                    <QuestionCircle />
                  </Tooltip>
                </>
              </Col>
              <Col xs={24} sm={12} xl={14}>
                <Skeleton {...representativesSkeletonProps}>
                  {
                    representatives.filter(
                      ({ isOnline, isPrincipal }) => isOnline && isPrincipal,
                    )?.length
                  }
                </Skeleton>
              </Col>
            </Row>

            <Row gutter={6}>
              <Col xs={24} sm={12} xl={10}>
                {t("pages.representatives.includeOfflineRepresentatives")}
              </Col>
              <Col xs={24} sm={12} xl={14}>
                <Switch
                  disabled={isRepresentativesLoading}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={(checked: boolean) => {
                    setIsIncludeOfflineRepresentatives(checked);
                  }}
                  defaultChecked={isIncludeOfflineRepresentatives}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Title level={3}>
            {t("pages.representatives.confirmationQuorum")}
          </Title>
          <Card
            size="small"
            bordered={false}
            className="detail-layout"
            style={{ marginBottom: "12px" }}
          >
            <Row gutter={6}>
              <Col xs={24} sm={8}>
                {t("pages.representatives.principalRepresentativeMinWeight")}
              </Col>
              <Col xs={24} sm={16}>
                <Skeleton {...confirmationQuorumSkeletonProps}>
                  {new BigNumber(principalRepresentativeMinWeight).toFormat()}{" "}
                  NANO
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={8}>
                {t("pages.representatives.onlineWrightQuorumPercent")}
              </Col>
              <Col xs={24} sm={16}>
                <Skeleton {...confirmationQuorumSkeletonProps}>
                  {onlineWeightQuorumPercent}%
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={8}>
                {t("pages.representatives.minimumOnlineWeight")}
              </Col>
              <Col xs={24} sm={16}>
                {" "}
                <Skeleton {...confirmationQuorumSkeletonProps}>
                  {new BigNumber(rawToRai(onlineWeightMinimum)).toFormat()} NANO
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={8}>
                {t("pages.representatives.totalOnlineStake")}
              </Col>
              <Col xs={24} sm={16}>
                <Skeleton {...confirmationQuorumSkeletonProps}>
                  {new BigNumber(rawToRai(onlineStakeTotal)).toFormat(0)} NANO
                </Skeleton>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={8}>
                {t("pages.representatives.totalPeerStake")}
              </Col>
              <Col xs={24} sm={16}>
                <Skeleton {...confirmationQuorumSkeletonProps}>
                  {new BigNumber(rawToRai(peersStakeTotal)).toFormat(0)} NANO
                </Skeleton>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card
        size="small"
        bordered={false}
        className="detail-layout"
        style={{ marginBottom: "12px" }}
      >
        {!isSmallAndLower ? (
          <>
            <Row gutter={6}>
              <Col sm={10} md={10} xl={6}>
                {t("pages.account.votingWeight")}
              </Col>
              <Col sm={10} md={10} xl={14}>
                {t("common.account")}
              </Col>
              <Col sm={4} md={4} xl={4}>
                {t("common.delegators")}
              </Col>
            </Row>
          </>
        ) : null}
        {representatives
          ?.filter(({ isOnline }) =>
            !isIncludeOfflineRepresentatives ? isOnline : true,
          )
          .map(({ account, weight, isOnline, isPrincipal }) => {
            const alias = knownAccounts.find(
              ({ account: knownAccount }) => account === knownAccount,
            )?.alias;
            const delegators = allDelegators[account]?.delegators;
            return (
              <Row gutter={6} key={account}>
                <Col
                  xs={{ span: 24, order: 2 }}
                  sm={{ span: 12, order: 1 }}
                  md={10}
                  xl={6}
                >
                  <span
                    className="default-color"
                    style={{
                      display: "block",
                    }}
                  >
                    {weight} NANO
                  </span>

                  {isPrincipal ? (
                    <>
                      {new BigNumber(weight)
                        .times(100)
                        .dividedBy(rawToRai(onlineStakeTotal))
                        .toFormat(2)}
                      {isSmallAndLower
                        ? t("pages.account.percentVotingWeight")
                        : "%"}
                    </>
                  ) : null}
                </Col>
                <Col
                  xs={{ span: 24, order: 1 }}
                  sm={{ span: 10, order: 2 }}
                  md={10}
                  xl={14}
                >
                  <div style={{ display: "flex", margin: "3px 0" }}>
                    <Tag
                      color={
                        isOnline
                          ? theme === Theme.DARK
                            ? TwoToneColors.RECEIVE_DARK
                            : TwoToneColors.RECEIVE
                          : theme === Theme.DARK
                          ? TwoToneColors.SEND_DARK
                          : TwoToneColors.SEND
                      }
                      className={`tag-${isOnline ? "online" : "offline"}`}
                    >
                      {t(`common.${isOnline ? "online" : "offline"}`)}
                    </Tag>
                    {weight >= principalRepresentativeMinWeight ? (
                      <Tag>{t("common.principalRepresentative")}</Tag>
                    ) : null}
                  </div>

                  {alias ? (
                    <div className="color-important">{alias}</div>
                  ) : null}

                  <Link to={`/account/${account}`} className="break-word">
                    {account}
                  </Link>
                </Col>
                <Col
                  xs={{ span: 24, order: 3 }}
                  sm={{ span: 4, order: 3 }}
                  md={4}
                  xl={4}
                >
                  {weight >= principalRepresentativeMinWeight ? (
                    <Skeleton
                      loading={isLoading}
                      // title={{ width: "10%" }}
                      paragraph={false}
                    >
                      <div>
                        {delegators ? (
                          <Link to={`/account/${account}/delegators`}>
                            <Button
                              type="primary"
                              size="small"
                              style={{ marginTop: "6px" }}
                            >
                              {t("pages.account.viewDelegators", {
                                count: Object.keys(delegators).length,
                              })}
                            </Button>
                          </Link>
                        ) : null}
                        {!delegators
                          ? t("pages.representative.noDelegatorsFound")
                          : null}
                      </div>
                    </Skeleton>
                  ) : null}
                </Col>
              </Row>
            );
          })}
      </Card>
    </>
  );
};

export default Representatives;
