import React from "react";
import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();
  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="story-section">
      {hits.map((story) => {
        console.log(story);
        const { objectID, title, num_comments, url, points, author } = story;
        return (
          <article key={objectID} className="article-card">
            <h4 className="title">{title}</h4>
            <p className="point-author-comm">
              {points} points by <span>{author} |</span> {num_comments} comments
            </p>
            <div className="links">
              <a href={url} target="_blank" rel="noreferrer">
                read more
              </a>
              <button
                onClick={() => removeStory(objectID)}
                className="remove-btn"
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
