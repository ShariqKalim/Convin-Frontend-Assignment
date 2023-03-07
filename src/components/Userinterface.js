import React, { useState } from "react";
import "../App.css";
const Userinterface = () => {
  const [buckets, setBuckets] = useState([
    { name: "Entertainment Videos", cards: [] },
    { name: "Education Videos", cards: [] },
    { name: "Sports Videos", cards: [] },
  ]);
  const [history, setHistory] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState({ name: "", link: "" });

  const [newBucketName, setNewBucketName] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardLink, setNewCardLink] = useState("");

  const handleNewBucketNameChange = (event) => {
    setNewBucketName(event.target.value);
  };

  const handleNewCardNameChange = (event) => {
    setNewCardName(event.target.value);
  };

  const handleNewCardLinkChange = (event) => {
    setNewCardLink(event.target.value);
  };

  const handleBucketAdd = () => {
    if (newBucketName.trim() === "") {
      return;
    }

    const newBucket = { name: newBucketName, cards: [] };
    setBuckets([...buckets, newBucket]);
    setNewBucketName("");
  };

  const handleCardAdd = (bucketIndex) => {
    if (newCardName.trim() === "" || newCardLink.trim() === "") {
      return;
    }

    const newCard = { name: newCardName, link: newCardLink };
    const updatedBucket = {
      ...buckets[bucketIndex],
      cards: [...buckets[bucketIndex].cards, newCard],
    };
    const updatedBuckets = [...buckets];
    updatedBuckets[bucketIndex] = updatedBucket;
    setBuckets(updatedBuckets);
    setNewCardName("");
    setNewCardLink("");
  };

  const handleCardDelete = (bucketIndex, cardIndex) => {
    const updatedBucket = {
      ...buckets[bucketIndex],
      cards: buckets[bucketIndex].cards.filter((_, i) => i !== cardIndex),
    };
    const updatedBuckets = [...buckets];
    updatedBuckets[bucketIndex] = updatedBucket;
    setBuckets(updatedBuckets);
  };

  const handleBucketDelete = (bucketIndex) => {
    const updatedBuckets = buckets.filter((_, i) => i !== bucketIndex);
    setBuckets(updatedBuckets);
  };

  const handleCardMove = (
    sourceBucketIndex,
    destinationBucketIndex,
    cardIndex
  ) => {
    const card = buckets[sourceBucketIndex].cards[cardIndex];
    const updatedSourceBucket = {
      ...buckets[sourceBucketIndex],
      cards: buckets[sourceBucketIndex].cards.filter((_, i) => i !== cardIndex),
    };
    const updatedDestinationBucket = {
      ...buckets[destinationBucketIndex],
      cards: [...buckets[destinationBucketIndex].cards, card],
    };
    const updatedBuckets = [...buckets];
    updatedBuckets[sourceBucketIndex] = updatedSourceBucket;
    updatedBuckets[destinationBucketIndex] = updatedDestinationBucket;
    setBuckets(updatedBuckets);
  };

  const handleCardPlay = (card) => {
    const playedCard = { name: card.name, link: card.link, time: new Date() };
    setHistory([...history, playedCard]);
    setCurrentCard(card);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="heading">My Video/Music Card Collection</h1>
      <div>
        <h2 className="Buckets">Buckets</h2>
        <ul>
          {buckets.map((bucket, bucketIndex) => (
            <li key={bucketIndex}>
              <div className="SubHeadings ">{bucket.name}</div>

              <button
                className="Sub_Buttons"
                onClick={() => handleBucketDelete(bucketIndex)}
              >
                Delete
              </button>
              <ul>
                <div className="AllCards">
                  {bucket.cards.map((card, cardIndex) => (
                    <div className="cards">
                      <li key={cardIndex}>
                        <div className="cardInfo">
                          <div>
                            <span>Name : </span>
                            {card.name}
                          </div>
                          <div>
                            <span>Link : </span>
                            {card.link}
                          </div>
                        </div>
                        <button
                          className="AllButtons red"
                          onClick={() =>
                            handleCardDelete(bucketIndex, cardIndex)
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="AllButtons blue"
                          onClick={() =>
                            handleCardMove(
                              bucketIndex,
                              bucketIndex + 1,
                              cardIndex
                            )
                          }
                        >
                          Move to Next Bucket
                        </button>
                        <button
                          className="AllButtons"
                          onClick={() =>
                            handleCardMove(
                              bucketIndex,
                              bucketIndex - 1,
                              cardIndex
                            )
                          }
                        >
                          Move to Previous Bucket
                        </button>
                        <button
                          className="AllButtons green"
                          onClick={() => handleCardPlay(card)}
                        >
                          Play
                        </button>
                      </li>
                    </div>
                  ))}
                </div>
                <li>
                  <input
                    className="Inputs"
                    type="text"
                    placeholder="Card Name"
                    value={newCardName}
                    onChange={handleNewCardNameChange}
                  />
                  <input
                    className="Inputs"
                    type="text"
                    placeholder="Card Link"
                    value={newCardLink}
                    onChange={handleNewCardLinkChange}
                  />
                  <button
                    className="Add_Button"
                    onClick={() => handleCardAdd(bucketIndex)}
                  >
                    Add
                  </button>
                </li>
              </ul>
            </li>
          ))}
          <li>
            <h1 className="Buckets">Add Buckets</h1>
            <input
              className="Add_Bucket"
              type="text"
              placeholder="Bucket Name"
              value={newBucketName}
              onChange={handleNewBucketNameChange}
            />
            <button className="Add_button" onClick={handleBucketAdd}>
              Add
            </button>
          </li>
        </ul>
      </div>

      <div className="History_content">
        <h2 className="text-center">History</h2>
        <ul>
          {history.map((playedCard, playedCardIndex) => (
            <li key={playedCardIndex}>
              <div>
                <span>
                  <b>Name</b> :{" "}
                </span>
                {playedCard.name}
              </div>
              <div>
                <span>
                  <b>Link</b> :
                </span>
                <a href={playedCard.link}>{playedCard.link}</a>
              </div>
              <div>{playedCard.time.toString()}</div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="History_content">
          <div>{currentCard.name}</div>
          <iframe
            src={currentCard.link}
            allow="autoplay"
            allowFullScreen
            title={currentCard.name}
            className="Iframe"
          />
          <button onClick={handleModalClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Userinterface;
