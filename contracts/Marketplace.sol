// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TourismMarketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
        string itemId;
        string metadataURI;
        bool active;
    }

    struct Escrow {
        uint256 amount;
        address buyer;
        bool released;
        bool refunded;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => Escrow)) public escrows;
    uint256 public listingCount;
    uint256 public platformFee = 25; // 2.5% fee (basis points)

    IERC20 public tourismToken; // Platform token for rewards

    event ListingCreated(uint256 indexed listingId, address indexed seller, uint256 price, string itemId);
    event ItemPurchased(uint256 indexed listingId, address indexed buyer, address indexed seller, uint256 price);
    event EscrowReleased(uint256 indexed listingId, address indexed buyer, uint256 amount);
    event EscrowRefunded(uint256 indexed listingId, address indexed buyer, uint256 amount);
    event NFTMinted(uint256 indexed tokenId, address indexed to, string tokenURI);

    constructor(address _tourismToken) {
        tourismToken = IERC20(_tourismToken);
    }

    function createListing(
        uint256 _price,
        string memory _itemId,
        string memory _metadataURI
    ) external returns (uint256) {
        require(_price > 0, "Price must be greater than 0");

        listingCount++;
        listings[listingCount] = Listing({
            seller: msg.sender,
            price: _price,
            itemId: _itemId,
            metadataURI: _metadataURI,
            active: true
        });

        emit ListingCreated(listingCount, msg.sender, _price, _itemId);
        return listingCount;
    }

    function purchaseItem(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.active, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Cannot buy your own item");

        // Calculate platform fee
        uint256 fee = (listing.price * platformFee) / 1000;
        uint256 sellerAmount = listing.price - fee;

        // Create escrow
        escrows[_listingId][msg.sender] = Escrow({
            amount: listing.price,
            buyer: msg.sender,
            released: false,
            refunded: false
        });

        // Transfer platform fee to owner
        payable(owner()).transfer(fee);

        emit ItemPurchased(_listingId, msg.sender, listing.seller, listing.price);
    }

    function releaseEscrow(uint256 _listingId, address _buyer) external {
        Escrow storage escrow = escrows[_listingId][_buyer];
        require(!escrow.released && !escrow.refunded, "Escrow already processed");
        require(msg.sender == listings[_listingId].seller || msg.sender == owner(), "Not authorized");

        escrow.released = true;

        // Transfer funds to seller
        payable(listings[_listingId].seller).transfer(escrow.amount);

        // Reward buyer with tokens (if available)
        if (address(tourismToken) != address(0)) {
            // Mint or transfer reward tokens to buyer
            // This would be implemented based on token contract
        }

        emit EscrowReleased(_listingId, _buyer, escrow.amount);
    }

    function refundEscrow(uint256 _listingId, address _buyer) external {
        Escrow storage escrow = escrows[_listingId][_buyer];
        require(!escrow.released && !escrow.refunded, "Escrow already processed");
        require(msg.sender == owner() || msg.sender == listings[_listingId].seller, "Not authorized");

        escrow.refunded = true;

        // Refund buyer
        payable(_buyer).transfer(escrow.amount);

        emit EscrowRefunded(_listingId, _buyer, escrow.amount);
    }

    function getListing(uint256 _listingId) external view returns (
        address seller,
        uint256 price,
        string memory itemId,
        string memory metadataURI,
        bool active
    ) {
        Listing memory listing = listings[_listingId];
        return (
            listing.seller,
            listing.price,
            listing.itemId,
            listing.metadataURI,
            listing.active
        );
    }

    function getListings() external view returns (uint256[] memory) {
        uint256[] memory activeListings = new uint256[](listingCount);
        uint256 count = 0;

        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].active) {
                activeListings[count] = i;
                count++;
            }
        }

        // Resize array to actual count
        assembly {
            mstore(activeListings, count)
        }

        return activeListings;
    }

    function escrowAmount(uint256 _listingId, address _buyer) external view returns (uint256) {
        return escrows[_listingId][_buyer].amount;
    }

    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 100, "Fee too high"); // Max 10%
        platformFee = _fee;
    }

    function deactivateListing(uint256 _listingId) external {
        require(listings[_listingId].seller == msg.sender || msg.sender == owner(), "Not authorized");
        listings[_listingId].active = false;
    }

    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
