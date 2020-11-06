import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { format } from 'date-fns';

import { Coin } from './api';

type Props = {
  coin: Coin | null;
};

const CryptoList: FunctionComponent<Props> = ({ coin }) => (
  <DetailWrapper>
    {coin ? (
      <>
        <Header>
          <Info>
            <CoinLogo src={coin.logoUrl} />
            <div>
              <Heading>{coin.name}</Heading>
              <CoinSymbol>{coin.symbol}</CoinSymbol>
            </div>
          </Info>
          {coin.monthChangePct && (
            <HeadingPrice>
              {coin.price}
              <Percent>{coin.dayChangePct}</Percent>
            </HeadingPrice>
          )}
        </Header>
        <Details>
          {coin.weekChangePct && (
            <Label>
              Week
              <Percent>{coin.weekChangePct}</Percent>
            </Label>
          )}
          {coin.monthChangePct && (
            <Label>
              Month
              <Percent>{coin.monthChangePct}</Percent>
            </Label>
          )}
          {coin.yearChangePct && (
            <Label>
              Year
              <Percent>{coin.yearChangePct}</Percent>
            </Label>
          )}
          <Label>
            Rank
            <Value>#{coin.rank}</Value>
          </Label>

          {coin.volume && (
            <Label>
              Volume
              <Value>{coin.volume}</Value>
            </Label>
          )}
          {coin.high && (
            <Label>
              ATH
              <Value>{coin.high}</Value>
            </Label>
          )}
          {coin.marketCap && (
            <Label>
              Mkt Cap
              <Value>{coin.marketCap}</Value>
            </Label>
          )}
        </Details>
        <LastUpdated>
          Last updated{' '}
          {format(new Date(coin.priceTimestamp), 'MM/dd/yy - HH:MM a')}
        </LastUpdated>
      </>
    ) : null}
  </DetailWrapper>
);

export default CryptoList;

const DetailWrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, #f5f7ff 0%, #ffffff 100%);
  flex: 0 0 calc(66.6% - 25px);
  border-radius: 10px;
`;

const Header = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #f5f7ff;
  padding: 30px 50px 20px 50px;
  display: flex;
  justify-content: space-between;
`;

const LastUpdated = styled.div`
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  bottom: 10px;
  right: 10px;
  color: #7e828f;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const CoinLogo = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 10px;
`;

const Heading = styled.div`
  color: #353448;
  font-weight: bold;
  font-size: 24px;
`;

const HeadingPrice = styled(Heading)`
  text-align: right;
`;

const CoinSymbol = styled.span`
  font-size: 18px;
  color: #7e828f;
`;

const Percent = styled.div<{ children: React.ReactNode }>`
  font-size: 18px;
  color: #00e001;

  ${({ children }) => {
    if (typeof children === 'string' && children[0] === '-') {
      return 'color: #ff0015;';
    }
  }}
`;

const Details = styled.div`
  margin: 20px 0;
  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  flex-wrap: wrap;
`;

const Label = styled.div`
  flex: 0 0 33.3%;
  font-size: 18px;
  color: #7e828f;
  margin-bottom: 20px;
`;

const Value = styled.div`
  color: #7e828f;
  font-weight: bold;
`;
