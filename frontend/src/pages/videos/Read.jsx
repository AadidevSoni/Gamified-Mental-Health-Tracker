import React, { useEffect, useState } from 'react';
import './Read.css';

//Dataset
const booksLibrary = [
  {
    title: 'The Art of Happiness',
    author: 'Dalai Lama & Howard Cutler',
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1593480576i/54330228.jpg',
    url: 'https://archive.org/details/dalai-lama-dalai-lama-the-art-of-happiness-in-a-troubled-world',
  },
  {
    title: 'Meditations',
    author: 'Marcus Aurelius',
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL.jpg',
    url: 'https://www.gutenberg.org/ebooks/2680',
  },
  {
    title: 'Wherever You Go, There You Are',
    author: 'Jon Kabat-Zinn',
    thumbnail: 'https://covers.openlibrary.org/b/id/8226196-L.jpg',
    url: 'https://archive.org/details/whereveryougothe00kaba_1',
  },
  {
    title: 'The Miracle of Mindfulness',
    author: 'Thich Nhat Hanh',
    thumbnail: 'https://covers.openlibrary.org/b/id/8231850-L.jpg',
    url: 'https://archive.org/details/miracleofmindful00nhan',
  },
  {
    title: 'As a Man Thinketh',
    author: 'James Allen',
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1632020500i/81959.jpg',
    url: 'https://www.gutenberg.org/ebooks/4507',
  },
  {
    title: 'Emotional Intelligence',
    author: 'Daniel Goleman',
    thumbnail: 'https://m.media-amazon.com/images/I/71z-XQzRclL.jpg',
    url: 'https://archive.org/details/emotionalintelli00gole',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
    url: 'https://archive.org/details/atomic-habits-james-clear_202105',
  },
  {
    title: 'Radical Acceptance',
    author: 'Tara Brach',
    thumbnail: 'https://m.media-amazon.com/images/I/71VrNbnfjrL.jpg',
    url: 'https://archive.org/details/radicalacceptanc0000brac',
  },
  {
    title: 'The Gifts of Imperfection',
    author: 'Brené Brown',
    thumbnail: 'https://brenebrown.com/wp-content/uploads/2021/09/BB_TheGiftsOfImperfection_SoftCover-1.png',
    url: 'https://archive.org/details/giftsofimperfect0000brow',
  },
  {
    title: 'The 6-Minute Diary',
    author: 'Dominik Spenst',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMR7mA_HaPGGyOoTFy-Ir6RxOGRCJupFJ1A&s',
    url: 'https://www.6minutediary.com/',
  },
  {
    title: 'Ikigai: The Japanese Secret to a Long and Happy Life',
    author: 'Héctor García & Francesc Miralles',
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL._AC_SL1500_.jpg',
    url: 'https://archive.org/details/ikigai-japanese-secret-to-a-long-and-happy-life',
  },
  {
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    thumbnail: 'https://m.media-amazon.com/images/I/71CME+YojvL.jpg',
    url: 'https://archive.org/details/think-like-a-monk-jay-shetty',
  },
];


const Yoga = () => {
  //UseStates
  const [loadingScreen, setLoadingScreen] = useState(true);

  //Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="yogaPage">
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Books Library...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className="yogaHeading">Books Library</h1>

      <div className="videoCardGrid-yoga">
        {booksLibrary.map((video, index) => (
          <a  
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="videoCard-yoga"
          >
            <img src={video.thumbnail} alt={video.title} className="videoThumbnail-yoga" />
            <div className="videoTitle-yoga">{video.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Yoga;
