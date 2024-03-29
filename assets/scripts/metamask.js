const connectButton = document.getElementById("connect-button");
const status = document.getElementById("status");
const ethereumAmount = document.getElementById("ethereum-amount");

connectButton.addEventListener("click", async () => {
    // Check if Metamask is installed
    if (typeof window.ethereum === "undefined") {
        status.textContent = "Please install Metamask to connect.";
        return;
    }

    try {
        // Request access to the user's Metamask wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });
        status.textContent = "Connected to Metamask!";
        // Do something with the connected wallet, such as fetching the user's account address
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        console.log("Connected account:", accounts[0]);

        // Display the Ethereum amount in the connected wallet
        displayEthereumAmount(accounts[0]);
    } catch (error) {
        // Handle errors that may occur during the connection process
        status.textContent = "Failed to connect to Metamask.";
        console.error(error);
    }
});

async function displayEthereumAmount(account) {
    try {
        // Display loading indicator
        ethereumAmount.textContent = "Loading...";

        // Get the amount of Ethereum in the connected wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        const etherAmount = ethers.utils.formatEther(balance);
        ethereumAmount.textContent = `${etherAmount} ETH`;
    } catch (error) {
        // Handle errors that may occur when fetching the Ethereum amount
        ethereumAmount.textContent = "Failed to load Ethereum amount.";
        console.error(error);
    }
}
