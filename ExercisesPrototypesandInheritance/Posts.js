class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    toString() {
        return `Post: ${this.title}\nContent: ${this.content}`;
    }
}

class SocialMediaPost extends Post {
    constructor(title, content, likes, dislikes) {
        super(title, content);
        this.likes = Number(likes);
        this.dislikes = Number(dislikes);
        this.comments = [];
    }

    addComment(comment) {
        this.comments.push(comment);
    }
    toString() {
        let output = super.toString() + '\n';
        output += `Rating: ${this.likes - this.dislikes} \n`;

        if (this.comments.length > 0) {
            output += `Comments: \n`;
            this.comments.forEach(x => output += ` * ${x} \n`);
        }
        return output;
    }
}

class BlogPost extends Post {
    constructor(title, content, views) {
        super(title, content);
        this.views = Number(views);
    }

    view() {
        this.views++;
        return this;
    }

    toString() {
        let output = super.toString() + '\n';
        output += `Views: ${this.views}`;

        return output;
    }
}
let post = new Post('Post', 'Content');
console.log(post.toString());
// Post: Post
// Content: Content
let scm = new SocialMediaPost('TestTitle', 'TestContent', 25, 30);
scm.addComment('Good post');
scm.addComment('Very good post');
scm.addComment('Wow!');
console.log(scm.toString());