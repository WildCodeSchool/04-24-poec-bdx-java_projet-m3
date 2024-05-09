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


INSERT INTO users (email, password, role)
VALUES 
    ('marie.delaire@outlook.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('chocholastico@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('madix@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('aurore@free.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('cassi@outlook.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('fred@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('toinudu33@gmail.fr', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('de@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('de@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),
    ('p.lemoine@outlook.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'mentor'),

    ('nassdu33@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('marie@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('marie@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('test@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('marie.delo@outlook.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('Nathan@yesenia.net', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('Nathan@yesenia.net', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('test@gmail.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('clara@test.com', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student'),
    ('Pierre@test.fr', '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6', 'student');



INSERT INTO mentors (firstname, lastname, description, imgUrl, title, githubUrl, linkedinUrl, userId)
VALUES 
    ('Marie', 'Delaire', 'Super Mentor !!!', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 1),
    ('Pierre', 'Lemoine', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 2),
    ('Nassime', 'Harmach', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 3),
    ('Pierre', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 4),
    ('Pierre', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 5),
    ('test', 'test', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 6),
    ('Nassime', 'Harmach', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 7),
    ('Pierre', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 8),
    ('Pierre', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 9),
    ('test', 'test', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 10);
    

INSERT INTO students (firstname, lastname, description, imgUrl, title, githubUrl, linkedinUrl, userId)
VALUES 
    ('Marie S', 'Delaire', 'Super Mentor !!!', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 11),
    ('Pierre S', 'Lemoine', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 12),
    ('Nassime S', 'Harmach', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 13),
    ('Pierre S', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 14),
    ('Pierre S', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 15),
    ('test S', 'test', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 16),
    ('Nassime S', 'Harmach', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 17),
    ('Pierre S', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 18),
    ('Pierre S', 'Dupont', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 19),
    ('test S', 'test', '', 'https://picsum.photos/200/300', 'Dev Web', 'https://www.github.com/', 'https://www.linkedin.com/', 20);
    

INSERT INTO skills (name) VALUES
    ('javascript'),
    ('C plus plus'),
    ('C Sharp'),
    ('java'),
    ('html'),
    ('css'),
    ('angular'),
    ('react'),
    ('spring'),
    ('node');


INSERT INTO languages (name) VALUES
    ('français'),
    ('arabe'),
    ('anglais'),
    ('chinois'),
    ('japonais'),
    ('koréen'),
    ('hebreu'),
    ('turk'),
    ('farsi'),
    ('afrikan');


TRUNCATE TABLE user_skills;

-- Insérer des données aléatoires dans la table de jointure
INSERT INTO user_languages (userId, languageId)
SELECT 
    FLOOR(RAND() * 10) + 1 AS userId,  -- Génère un nombre aléatoire entre 1 et 10 pour userId
    FLOOR(RAND() * 10) + 1 AS languageId  -- Génère un nombre aléatoire entre 1 et 10 pour skillId
FROM
    information_schema.tables t1,
    information_schema.tables t2
    LIMIT 100;



INSERT INTO user_skills (userId, skillId)
SELECT 
    FLOOR(RAND() * 10) + 1 AS userId,  -- Génère un nombre aléatoire entre 1 et 10 pour userId
    FLOOR(RAND() * 10) + 1 AS skillId  -- Génère un nombre aléatoire entre 1 et 10 pour skillId
FROM
    information_schema.tables t1,
    information_schema.tables t2
    LIMIT 100;

