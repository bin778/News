export const NewsList = ({ news }) => (
  <ul className="newsList">
    {news.map((item, index) => (
      <li key={index} className="newsCard">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link">
          {item.title}
        </a>
        <p className="description">{item.description}</p>
      </li>
    ))}
  </ul>
);
