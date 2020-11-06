import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components/macro';
import { useQuery, gql } from '@apollo/client';

import { Coin } from './api';

import CryptoList from './CryptoList';
import CryptoDetail from './CryptoDetail';

const COINS = gql`
  query {
    coins(first: 20, orderBy: "rank") {
      edges {
        node {
          id
          symbol
          name
          logoUrl
          high
          price
          priceTimestamp
          marketCap
          rank
          dayChangePct
          weekChangePct
          monthChangePct
          yearChangePct
          volume
        }
      }
    }
  }
`;

function App() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const { data } = useQuery(COINS);

  useEffect(() => {
    const firstCoin = data?.coins.edges[0]?.node;
    if (firstCoin) {
      setSelectedCoin(firstCoin);
    }
  }, [data]);

  return (
    <AppContainer>
      <VisuallyHidden aria-live="polite">
        {selectedCoin?.name} selected
      </VisuallyHidden>
      <CryptoList
        coins={data?.coins.edges}
        onChange={(coin) => setSelectedCoin(coin)}
        selectedCoin={selectedCoin}
      />
      <CryptoDetail coin={selectedCoin} />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  border-top: 50px solid #757ae9;
  max-height: 600px;
  max-width: 800px;
  background: #292929;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 50px 40px;
`;

const VisuallyHidden = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
