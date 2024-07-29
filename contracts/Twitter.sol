// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
interface UserContract {
    struct UserProfile {
        address userAddress;
        string displayName;
        string bio;
    }
    function setProfile(string memory _displayName, string memory _bio) external ;
    function getProfile(address _user) external  view returns (UserProfile memory) ;
    function changeBio(string memory _newBio)external;
}

contract Twitter is Ownable {

    uint public MAX_TWEET_LENGTH = 300;
    UserContract userContract;
    // address userContractKey=0x9da9df2Fe440fA9E05B620a05990d7c644aCBBB8;
    struct Tweet {
        uint id;
        address author;
        string content;
        uint timestamp;
        uint likes;
        uint dislikes;
    }

    constructor( address userContractKey) Ownable(msg.sender) {
    userContract=UserContract(userContractKey);
    }

    modifier onlyRegistered(){
        require(msg.sender==userContract.getProfile(msg.sender).userAddress, "User is not registered");
        _;
    }

    event TweetCreated(uint id, address author, string content, uint timestamp);
    event TweetLiked(address liker, address author, uint tweetId, uint newLikeCount);
    event TweetUnliked(address unliker, address author, uint tweetId, uint newLikeCount);
    event TweetDisliked(address disliker, address author, uint tweetId, uint newDislikeCount);
    event TweetNotDisliked(address notDisliker, address author, uint tweetId, uint newDislikeCount);

    function changeTweetLength(uint16 newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH = newTweetLength;
    }

    mapping(address => Tweet[]) public usernameMapping;
    mapping(uint => mapping(address => bool)) private likedTweets;
    mapping(uint => mapping(address => bool)) private dislikedTweets;

    function createTweet(string memory _tweet) public onlyRegistered {
        require(bytes(_tweet).length > 0, "Invalid tweet");
        require(bytes(_tweet).length <= MAX_TWEET_LENGTH, "Tweet is too long");
        Tweet memory newTweet = Tweet(
            usernameMapping[msg.sender].length,
            msg.sender,
            _tweet,
            block.timestamp,
            0,
            0
        );
        usernameMapping[msg.sender].push(newTweet);
        emit TweetCreated(usernameMapping[msg.sender].length - 1, msg.sender, _tweet, block.timestamp);
    }

    function getTweet(address _user, uint i) public view onlyRegistered returns (Tweet memory) {
        return usernameMapping[_user][i];
    }

    function getAllTweets(address _user) public view  onlyRegistered returns (Tweet[] memory) {
        return usernameMapping[_user];
    }

    function likeTweet(address author, uint id) external onlyRegistered {
        require(usernameMapping[author][id].id == id, "Tweet doesn't exist");
        require(!likedTweets[usernameMapping[author][id].id][msg.sender], "Tweet already liked by this user");
        usernameMapping[author][id].likes++;
        likedTweets[id][msg.sender] = true;
        if(dislikedTweets[usernameMapping[author][id].id][msg.sender] == true){
            usernameMapping[author][id].dislikes--;
            dislikedTweets[usernameMapping[author][id].id][msg.sender] = false;
        }
        emit TweetLiked(msg.sender, author, id, usernameMapping[author][id].likes);
    }

    function unlikeTweet(address author, uint id) external onlyRegistered {
        require(usernameMapping[author][id].id == id, "Tweet doesn't exist");
        require(likedTweets[usernameMapping[author][id].id][msg.sender], "Tweet not liked by this user");
        require(usernameMapping[author][id].likes > 0, "Tweet has 0 likes");
        usernameMapping[author][id].likes--;
        likedTweets[id][msg.sender] = false;
        emit TweetUnliked(msg.sender, author, id, usernameMapping[author][id].likes);
    }

    function dislikeTweet(address author, uint id) external onlyRegistered {
        require(usernameMapping[author][id].id == id, "Tweet doesn't exist");
        require(!dislikedTweets[usernameMapping[author][id].id][msg.sender], "Tweet already disliked by this user");
        usernameMapping[author][id].dislikes++;
        dislikedTweets[id][msg.sender] = true;
        if(likedTweets[usernameMapping[author][id].id][msg.sender] == true){
            usernameMapping[author][id].likes--;
            likedTweets[usernameMapping[author][id].id][msg.sender] = false;
        }
        emit TweetDisliked(msg.sender, author, id, usernameMapping[author][id].dislikes);
    }

    function notDislikeTweet(address author, uint id) external onlyRegistered {
        require(usernameMapping[author][id].id == id, "Tweet doesn't exist");
        require(dislikedTweets[usernameMapping[author][id].id][msg.sender], "Tweet not disliked by this user");
        require(usernameMapping[author][id].dislikes > 0, "Tweet has 0 dislikes");
        usernameMapping[author][id].dislikes--;
        dislikedTweets[id][msg.sender] = false;
        emit TweetNotDisliked(msg.sender, author, id, usernameMapping[author][id].dislikes);
    }

    function getTotalLikes(address _author) external  view onlyRegistered  returns (uint) {
        uint totalLikes;
        for (uint i = 0; i < usernameMapping[_author].length; i++) {
            totalLikes += usernameMapping[_author][i].likes;
        }
        return totalLikes;
    }

    function getTotalDislikes(address _author) external view onlyRegistered returns (uint) {
        uint totalDislikes;
        for (uint i = 0; i < usernameMapping[_author].length; i++) {
            totalDislikes += usernameMapping[_author][i].dislikes;
        }
        return totalDislikes;
    }
}
