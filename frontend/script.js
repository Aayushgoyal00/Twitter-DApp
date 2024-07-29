let web3;
let accounts;
let profileContract;
let twitterContract;
import profileData from "./build/contracts/Profile.json"
// const profileData =require('.\build\contracts\Profile.json')
const profileABI=profileData.abi
const TwitterData =require('.\build\contracts\Twitter.json')
const twitterABI=TwitterData.abi
// const profileABI = profileData.abi;


// const profileABI = [{
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "profiles",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "userAddress",
//         "type": "address"
//       },
//       {
//         "internalType": "string",
//         "name": "displayName",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "bio",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_displayName",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_bio",
//         "type": "string"
//       }
//     ],
//     "name": "setProfile",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_user",
//         "type": "address"
//       }
//     ],
//     "name": "getProfile",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "userAddress",
//             "type": "address"
//           },
//           {
//             "internalType": "string",
//             "name": "displayName",
//             "type": "string"
//           },
//           {
//             "internalType": "string",
//             "name": "bio",
//             "type": "string"
//           }
//         ],
//         "internalType": "struct Profile.UserProfile",
//         "name": "",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_newBio",
//         "type": "string"
//       }
//     ],
//     "name": "changeBio",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }]
// const twitterABI = [
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "userContractKey",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "OwnableInvalidOwner",
//       "type": "error"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "OwnableUnauthorizedAccount",
//       "type": "error"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "previousOwner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "OwnershipTransferred",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "content",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         }
//       ],
//       "name": "TweetCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "disliker",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tweetId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "newDislikeCount",
//           "type": "uint256"
//         }
//       ],
//       "name": "TweetDisliked",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "liker",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tweetId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "newLikeCount",
//           "type": "uint256"
//         }
//       ],
//       "name": "TweetLiked",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "notDisliker",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tweetId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "newDislikeCount",
//           "type": "uint256"
//         }
//       ],
//       "name": "TweetNotDisliked",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "unliker",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tweetId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "newLikeCount",
//           "type": "uint256"
//         }
//       ],
//       "name": "TweetUnliked",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "MAX_TWEET_LENGTH",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "renounceOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "transferOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "usernameMapping",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "content",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "likes",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "dislikes",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint16",
//           "name": "newTweetLength",
//           "type": "uint16"
//         }
//       ],
//       "name": "changeTweetLength",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_tweet",
//           "type": "string"
//         }
//       ],
//       "name": "createTweet",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_user",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "i",
//           "type": "uint256"
//         }
//       ],
//       "name": "getTweet",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "author",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "content",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "timestamp",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "likes",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "dislikes",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct Twitter.Tweet",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_user",
//           "type": "address"
//         }
//       ],
//       "name": "getAllTweets",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "author",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "content",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "timestamp",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "likes",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "dislikes",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct Twitter.Tweet[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "likeTweet",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "unlikeTweet",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "dislikeTweet",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "author",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "notDislikeTweet",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_author",
//           "type": "address"
//         }
//       ],
//       "name": "getTotalLikes",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_author",
//           "type": "address"
//         }
//       ],
//       "name": "getTotalDislikes",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     }
//   ];
  
// const profileAddress = '0x678A5f96c08249dD7Eb2660832Ab741A6C576caA'; // Profile contract address after deployment
// const twitterAddress = '0x5acc334994dC72e826c9288848ADb9e7C57736a7'; // Twitter contract address after deployment

const profileAddress = '0x1dc6F3355A8Bcd95C6F1a753126769c89e5Ebe4D'; // Profile contract address after deployment
const twitterAddress = '0xB8F73FbE6b2F897dfF764f9617a5712d6811b8D5'; // Twitter contract address after deployment

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            accounts = await web3.eth.getAccounts();
            profileContract = new web3.eth.Contract(profileABI, profileAddress);
            twitterContract = new web3.eth.Contract(twitterABI, twitterAddress);
            console.log('Connected to MetaMask');
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        console.log('No web3 provider found. Please install MetaMask.');
    }
});

document.getElementById('connectButton').addEventListener('click', async () => {
    if (web3) {
        accounts = await web3.eth.getAccounts();
        console.log('Connected accounts:', accounts);
    }
});

document.getElementById('createProfileButton').addEventListener('click', async () => {
    const displayName = document.getElementById('displayName').value;
    const bio = document.getElementById('bio').value;

    try {
        await profileContract.methods.setProfile(displayName, bio).send({ from: accounts[0] });
        console.log('Profile created successfully');
    } catch (error) {
        console.error('Error creating profile:', error);
    }
});

document.getElementById('createTweetButton').addEventListener('click', async () => {
    const tweetContent = document.getElementById('tweetContent').value;

    try {
        await twitterContract.methods.createTweet(tweetContent).send({ from: accounts[0] });
        console.log('Tweet created successfully');
        loadTweets();
    } catch (error) {
        console.error('Error creating tweet:', error);
    }
});

async function loadTweets() {
    const tweetsContainer = document.getElementById('tweetsContainer');
    tweetsContainer.innerHTML = '';

    try {
        const tweets = await twitterContract.methods.getAllTweets(accounts[0]).call();
        tweets.forEach((tweet, index) => {
            const tweetElement = document.createElement('div');
            tweetElement.innerHTML = `
                <p><strong>${tweet.author}</strong>: ${tweet.content}</p>
                <p>Likes: ${tweet.likes} Dislikes: ${tweet.dislikes}</p>
                <button onclick="likeTweet(${index})">Like</button>
                <button onclick="dislikeTweet(${index})">Dislike</button>
            `;
            tweetsContainer.appendChild(tweetElement);
        });
    } catch (error) {
        console.error('Error loading tweets:', error);
    }
}

window.likeTweet = async (tweetId) => {
    try {
        await twitterContract.methods.likeTweet(accounts[0], tweetId).send({ from: accounts[0] });
        console.log('Tweet liked');
        loadTweets();
    } catch (error) {
        console.error('Error liking tweet:', error);
    }
};

window.dislikeTweet = async (tweetId) => {
    try {
        await twitterContract.methods.dislikeTweet(accounts[0], tweetId).send({ from: accounts[0] });
        console.log('Tweet disliked');
        loadTweets();
    } catch (error) {
        console.error('Error disliking tweet:', error);
    }
};
