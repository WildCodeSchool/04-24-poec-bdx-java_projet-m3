CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('mentor', 'student') NOT NULL
);


CREATE TABLE mentors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    description TEXT,
    imgUrl VARCHAR(255),
    title VARCHAR(255),
    githubUrl VARCHAR(255),
    linkedinUrl VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    description TEXT,
    imgUrl VARCHAR(255),
    title VARCHAR(255),
    githubUrl VARCHAR(255),
    linkedinUrl VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE user_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    skillId INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (skillId) REFERENCES skills(id)
);

CREATE TABLE languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    languageId INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (languageId) REFERENCES languages(id)
);

CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    dateBegin DATE NOT NULL,
    dateEnd DATE,
    city VARCHAR(255),
    country VARCHAR(255),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE formations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    dateBegin DATE NOT NULL,
    dateEnd DATE,
    city VARCHAR(255),
    country VARCHAR(255),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

