import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

import { Coin } from './api';

type CoinEdge = {
  node: Coin;
};

type Props = {
  coins: CoinEdge[] | null;
  onChange: (coin: Coin) => void;
  selectedCoin: Coin | null;
};

const CryptoList: FunctionComponent<Props> = ({
  coins,
  selectedCoin,
  onChange,
}) =>
  coins ? (
    <List>
      {coins.map((coin) => {
        const id = `coin-${coin.node.id}`;
        return (
          <ListItem
            key={coin.node.id}
            aria-labelledby={id}
            onClick={() => onChange(coin.node)}
            selected={selectedCoin?.id === coin.node.id}
          >
            <CoinLogo src={coin.node.logoUrl} />
            <CoinTicker>{coin.node.symbol}</CoinTicker>
            <CoinName id={id}>{coin.node.name}</CoinName>
          </ListItem>
        );
      })}
    </List>
  ) : null; // TODO: loading spinner

export default CryptoList;

const List = styled.ul`
  max-height: 350px;
  margin: 0;
  list-style: none;
  flex: 0 0 calc(33.3% - 25px);
  background: linear-gradient(180deg, #f5f7ff 0%, #ffffff 100%);
  border-radius: 10px;
  padding: 10px 0;
  overflow-y: scroll;
`;

const CoinLogo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const CoinTicker = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
`;

const CoinName = styled.span`
  color: #7e828f;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
`;

const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;

  ${({ selected }) =>
    selected && 'background-color: #757ae9; span { color: white; }'}

  &:hover {
    background: #f5f7ff;

    span {
      color: #7e828f;
    }
  }
`;
