import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import NameStorage from './contracts/NameStorage.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [storedName, setStoredName] = useState('');
  const [showName, setShowName] = useState(false);

  // Replace with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Initialize Web3 and contract
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(
            NameStorage.abi,
            contractAddress
          );
          setContract(contractInstance);

        } catch (error) {
          console.error("Error initializing:", error);
        }
      }
    };

    init();
  }, []);

  const storeName = async () => {
    if (contract && nameInput) {
      try {
        await contract.methods.storeName(nameInput).send({ from: account });
        setNameInput('');
        setShowName(false); // Hide the name after storing
        alert("Name stored successfully!");
      } catch (error) {
        console.error("Error storing name:", error);
      }
    }
  };

  const getName = async () => {
    if (contract) {
      try {
        const name = await contract.methods.getMyName().call({ from: account });
        setStoredName(name || "No name stored yet");
        setShowName(true); // Show the name only when requested
      } catch (error) {
        console.error("Error getting name:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Hello World and Name DApp
        </Typography>

        {account ? (
          <>
            <Typography variant="body1" gutterBottom>
              Connected Account: {account}
            </Typography>

            <Box mt={3} mb={3}>
              <TextField
                label="Enter your name"
                variant="outlined"
                fullWidth
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={storeName}
                style={{ marginTop: '10px' }}
              >
                Set Name
              </Button>
            </Box>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={getName}
            >
              Get Name
            </Button>

            {showName && (
              <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
                Your stored name: {storedName}
              </Typography>
            )}
          </>
        ) : (
          <Typography variant="body1" align="center">
            Please connect to MetaMask to use this DApp
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default App;