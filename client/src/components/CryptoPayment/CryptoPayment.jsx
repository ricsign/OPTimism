import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure you have axios installed

const CryptoPaymentComponent = () => {
  const [paymentIntent, setPaymentIntent] = useState({});
  const [depositAddress, setDepositAddress] = useState({});
  const [typedData, setTypedData] = useState({});
  const [rawSignature, setRawSignature] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // see config doc
  const apiKey = "YOUR_API_KEY";
  const baseUrl = "https://api-sandbox.circle.com/v1";

  useEffect(() => {
    const createPaymentAndSignTransaction = async () => {
        await createPaymentIntent();
        await signTransaction();
    };

    createPaymentAndSignTransaction();
}, []);

useEffect(() => {
    const initializeComponent = async () => {
        await createPaymentIntent();
        await fetchDepositAddress();
    };

    initializeComponent();
}, []);



  useEffect(() => {
    // Step 1: Create a payment intent
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/paymentIntents`,
          {
            idempotencyKey: "17607606-e383-4874-87c3-7e46a5dc03dd",
            amount: {
              amount: "1.00",
              currency: "USD",
            },
            settlementCurrency: "USD",
            paymentMethods: [
              {
                type: "blockchain",
                chain: "ETH",
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPaymentIntent(response.data.data);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, []);

  // Fetch deposit address
  const fetchDepositAddress = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/paymentIntents/${paymentIntent.id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setDepositAddress(response.data.data.depositAddress);
    } catch (error) {
      console.error("Error fetching deposit address:", error);
    }
  };

  // Sign the transaction with the typed data
  const signTransaction = async () => {
    try {
      // Construct the transaction data to be signed
      const transactionData = {
        to: "0xRecipientAddress", // Replace with the recipient's address
        value: ethers.utils.parseEther("1.0"), // Sending 1 ETH
        nonce: await ethereum.getTransactionCount("0xYourSourceAddress"), // Replace with your source address
        gasLimit: ethers.utils.hexlify(21000),
        gasPrice: ethers.utils.parseUnits("20", "gwei"),
      };

      // Create a new Ethereum wallet using a private key
      const wallet = new ethers.Wallet("0xYourPrivateKey"); // Replace with your private key

      // Sign
      const signedTransaction = await wallet.signTransaction(transactionData);

      // Set the rawSignature state with the signed transaction
      setRawSignature(signedTransaction);
    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  };

  // Create crypto payment with signature
  const createCryptoPayment = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/payments/crypto`,
        {
          idempotencyKey: "ba943ff1-ca16-49b2-ba55-1057e70ca5c7",
          paymentIntentId: paymentIntent.id,
          protocolMetadata: {
            type: "TransferWithAuthorization",
            rawSignature: rawSignature, // Using the signed transaction
          },
          amount: {
            amount: "1.00",
            currency: "USD",
          },
          source: {
            address: "0xYourSourceAddress",
            type: "blockchain",
          },
          destination: {
            address: depositAddress.address,
            chain: "ETH",
          },
          quoteId: "c6ac001e-9812-4bc1-8dc3-1549b5adaa23",
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPaymentStatus(response.data.data.status);
    } catch (error) {
      console.error("Error creating crypto payment:", error);
    }
  };

  // JSX rendering
  return (
    <div>
      <h1>Crypto Payment Component</h1>
      <div>
        {/*  payment intent details */}
        <h2>Payment Intent Details</h2>
        <pre>{JSON.stringify(paymentIntent, null, 2)}</pre>

        {/*  deposit address details */}
        <h2>Deposit Address Details</h2>
        <pre>{JSON.stringify(depositAddress, null, 2)}</pre>

        {/*  typed data and raw signature */}
        <h2>Typed Data and Raw Signature</h2>
        {/*   typed data and raw signature */}
        <pre>{JSON.stringify(rawSignature, null, 2)}</pre>

        {/* Display typed data */}
        <h2>Typed Data</h2>
        <pre>{JSON.stringify(typedData, null, 2)}</pre>

        {/*  payment status */}
        <h2>Payment Status</h2>
        <p>{paymentStatus}</p>
      </div>

      <button onClick={createCryptoPayment}>Create Crypto Payment</button>

    </div>
  );
};

export default CryptoPaymentComponent;
