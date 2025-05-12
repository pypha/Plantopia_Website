// DOM Elements
const postForm = document.getElementById('postForm');
const postContent = document.getElementById('postContent');
const postMedia = document.getElementById('postMedia');
const fileName = document.getElementById('fileName');
const postsContainer = document.getElementById('postsContainer');


let posts = [
    {
        id: 1,
        userId: 1,
        username: "Maudy Ayunda",
        avatar: "image/maudyayunda.png",
        content: "Just got this beautiful monstera deliciosa! Any care tips?",
        media: {
            type: "image",
            url: "image/bungakrisan.png"
        },
        likes: 15,
        comments: [
            {
                userId: 2,
                username: "GreenThumb",
                content: "Make sure it gets bright, indirect light!",
                time: "2 hours ago"
            }
        ],
        time: "3 hours ago"
    },
    {
        id: 2,
        userId: 3,
        username: "UrbanJungle",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "My collection is growing! Here's a quick tour of my plant corner.",
        media: {
            type: "video",
            url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"
        },
        likes: 42,
        comments: [],
        time: "1 day ago"
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', loadPosts);
postForm.addEventListener('submit', handlePostSubmit);
postMedia.addEventListener('change', handleFileSelect);

// Functions
function loadPosts() {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="loading">No posts yet. Be the first to post!</div>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.dataset.id = post.id;
    
    // Media HTML
    let mediaHtml = '';
    if (post.media) {
        if (post.media.type === 'image') {
            mediaHtml = `<img src="${post.media.url}" alt="Post image" class="post-media">`;
        } else if (post.media.type === 'video') {
            mediaHtml = `
                <video controls class="post-media">
                    <source src="${post.media.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        }
    }
    
    // Comments HTML
    let commentsHtml = '';
    if (post.comments && post.comments.length > 0) {
        commentsHtml = `
            <div class="comments-container">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <div class="comment-user">${comment.username}</div>
                        <div class="comment-text">${comment.content}</div>
                        <div class="comment-time">${comment.time}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    postElement.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="${post.avatar}" alt="${post.username}" class="user-avatar">
                <div>
                    <div class="user-name">${post.username}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-actions">
                <button class="action-btn edit-btn" data-id="${post.id}">
                    <i></i>
                </button>
                <button class="action-btn delete-btn" data-id="${post.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        ${mediaHtml}
        <div class="post-footer">
            <div class="post-stats">
                <div class="stat like-stat" data-id="${post.id}">
                    <i class="far fa-heart"></i>
                    <span class="like-count">${post.likes}</span>
                </div>
                <div class="stat comment-stat">
                    <i class="far fa-comment"></i>
                    <span>${post.comments ? post.comments.length : 0}</span>
                </div>
            </div>
            <div class="post-comment">
                <input type="text" class="comment-input" placeholder="Add a comment...">
                <button class="comment-btn" data-id="${post.id}">Post</button>
            </div>
            ${commentsHtml}
        </div>
    `;
    
    // Add event listeners to buttons
    const likeBtn = postElement.querySelector('.like-stat');
    likeBtn.addEventListener('click', () => handleLike(post.id));
    
    const commentBtn = postElement.querySelector('.comment-btn');
    const commentInput = postElement.querySelector('.comment-input');
    commentBtn.addEventListener('click', () => handleComment(post.id, commentInput));
    
    const editBtn = postElement.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => handleEdit(post.id));
    
    const deleteBtn = postElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => handleDelete(post.id));
    
    return postElement;
}

function handlePostSubmit(e) {
    e.preventDefault();
    
    const content = postContent.value.trim();
    const file = postMedia.files[0];
    
    if (!content && !file) {
        alert('Please add some content or a photo/video');
        return;
    }
    

    
    const newPost = {
        id: Date.now(), // Simple way to generate a unique ID
        userId: 1, // Hardcoded for demo - would come from auth in real app
        username: "CurrentUser",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        content: content,
        likes: 0,
        comments: [],
        time: "Just now"
    };
    
    if (file) {
        const fileType = file.type.split('/')[0];
        if (fileType === 'image' || fileType === 'video') {

            newPost.media = {
                type: fileType,
                url: URL.createObjectURL(file)
            };
        } else {
            alert('Please upload an image or video file');
            return;
        }
    }
    
    posts.unshift(newPost); // Add to beginning of array
    loadPosts();
    
    // Reset form
    postContent.value = '';
    postMedia.value = '';
    fileName.textContent = 'No file chosen';
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
    } else {
        fileName.textContent = 'No file chosen';
    }
}

function handleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        
        // Update the like count in the UI
        const likeCountElement = document.querySelector(`.post[data-id="${postId}"] .like-count`);
        if (likeCountElement) {
            likeCountElement.textContent = post.likes;
        }
    }
}

function handleComment(postId, inputElement) {
    const content = inputElement.value.trim();
    if (!content) return;
    
    const post = posts.find(p => p.id === postId);
    if (post) {
        const newComment = {
            userId: 1, // Hardcoded for demo
            username: "CurrentUser",
            content: content,
            time: "Just now"
        };
        
        if (!post.comments) {
            post.comments = [];
        }
        
        post.comments.push(newComment);
        loadPosts(); // Refresh to show new comment
        
        // Clear the input
        inputElement.value = '';
    }
}

function handleEdit(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const newContent = prompt('Edit your post:', post.content);
        if (newContent !== null && newContent !== post.content) {
            post.content = newContent;
            loadPosts(); // Refresh to show changes
        }
    }
}

function handleDelete(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(p => p.id !== postId);
        loadPosts(); // Refresh to remove the post
    }
}