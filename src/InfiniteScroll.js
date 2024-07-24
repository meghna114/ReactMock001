
import React, { useState, useEffect, useCallback } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests

const InfiniteScroll = () => {
    // State for storing the fetched posts
    const [posts, setPosts] = useState([]);
    // State for tracking the current page number
    const [page, setPage] = useState(1);
    // State for loading status (to show a loading indicator)
    const [loading, setLoading] = useState(false);
    // State for checking if there are more posts to load
    const [hasMore, setHasMore] = useState(true);

    // Function to fetch posts from the API
    const fetchPosts = async (pageNumber) => {
        setLoading(true); // Set loading to true to show the loading indicator
        try {
            // Simulate a 2-second delay for loading
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Fetch posts from the API with a limit of 20 posts per page
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`);

            // Check if the response data is empty
            if (response.data.length === 0) {
                setHasMore(false); // If no data, set hasMore to false
            } else {
                // Append new posts to the existing list
                setPosts(prevPosts => [...prevPosts, ...response.data]);
            }
        } catch (error) {
            console.error('Error fetching data:', error); // Log any errors
        } finally {
            setLoading(false); // Set loading to false to hide the loading indicator
        }
    };

    // Handle scroll events to trigger fetching more posts
    const handleScroll = useCallback(() => {
        // Check if the user has scrolled to the bottom of the page
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            // Fetch more posts if not already loading and more posts are available
            if (hasMore && !loading) {
                setPage(prevPage => prevPage + 1); // Increment the page number
            }
        }
    }, [loading, hasMore]); // Dependency array ensures the function is updated when loading or hasMore changes

    // Fetch posts whenever the page number changes
    useEffect(() => {
        fetchPosts(page); // Call the fetchPosts function with the current page number
    }, [page]); // Dependency array ensures the function is called when page changes

    // Set up and clean up the scroll event listener
    useEffect(() => {
        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the scroll event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]); // Dependency array ensures the listener is updated when handleScroll changes

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
            {loading && <p>Loading more posts...</p>} {/* Show loading indicator while data is being fetched */}
            {!hasMore && !loading && <p>No more posts to load.</p>} {/* Show message when no more posts are available */}
        </div>
    );
};

export default InfiniteScroll; 
