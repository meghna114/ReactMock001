
import React, { useState, useEffect, useCallback } from 'react'; // import React and hooks
import axios from 'axios'; 

const InfiniteScroll = () => {
    // state for storing the fetched post from apis
    const [posts, setPosts] = useState([]);
    // state for tracking current page no
    const [page, setPage] = useState(1);
    // state for loading status 
    const [loading, setLoading] = useState(false);
    // sate for checking if there are more to load
    const [hasMore, setHasMore] = useState(true);

    // function to fetch posts from the apis
    const fetchPosts = async (pageNumber) => {
        setLoading(true); // set loading to true to show the loading indicator
        try {
            // simulate a 2-sec delay for loading
            await new Promise(resolve => setTimeout(resolve, 2000));

            // fetch posts from the apis with a limit of 20 posts per page
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`);

            // check if response data is empty or not
            if (response.data.length === 0) {
                setHasMore(false); // for no data, set hasMore to false
            } else {
                // Append new posts to the existing list
                setPosts(prevPosts => [...prevPosts, ...response.data]);
            }
        } catch (error) {
            console.error('Error fetching data:', error); // log errors
        } finally {
            setLoading(false); // set loading to false to hide the loading indicator
        }
    };

    // handle scroll events to trigger fetching more posts
    const handleScroll = useCallback(() => {
        // Check if the user has scrolled to the bottom of the page
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            // fetch more posts if not already loading and more posts are available
            if (hasMore && !loading) {
                setPage(prevPage => prevPage + 1); // Increment page no
            }
        }
    }, [loading, hasMore]); // Dependency array 

    // Fetch posts whenever the page number changes
    useEffect(() => {
        fetchPosts(page); // call the fetchPosts function with the current page no
    }, [page]); // dependency array 

    // set up and clean up the scroll event listener
    useEffect(() => {
        // add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // clean up the scroll event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]); // Dependency array 
    return (
        <div>
            <h1>Infinite Scrolling Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading more posts...</p>} 
            {!hasMore && !loading && <p>No more posts to load.</p>} 
        </div>
    );
};

export default InfiniteScroll; 
