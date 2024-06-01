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
    FOREIGN KEY (userId) REFERENCES users (id)
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
    FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE favorite_mentor_student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    mentorId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES students (id),
    FOREIGN KEY (mentorId) REFERENCES mentors (id),
    UNIQUE (studentId, mentorId)
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    skillId INT,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (skillId) REFERENCES skills (id),
    CONSTRAINT sans_repetition_skill UNIQUE (userId, skillId)
);

CREATE TABLE languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    languageId INT,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (languageId) REFERENCES languages (id),
    CONSTRAINT sans_repetition_language UNIQUE (userId, languageId)
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
    FOREIGN KEY (userId) REFERENCES users (id)
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
    FOREIGN KEY (userId) REFERENCES users (id)
);

INSERT INTO
    users (email, password, role)
VALUES (
        'marie.delaire@outlook.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'chocholastico@gmail.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'madix@gmail.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'aurore@free.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'cassi@outlook.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'fred@gmail.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'toinudu33@gmail.fr',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'de@gmail.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'de@gmail.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),
    (
        'p.lemoine@outlook.com',
        '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
        'mentor'
    ),

(
    'nassdu33@gmail.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'mahdi@gmail.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'marie@gmail.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'test@gmail.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'marie.delo@outlook.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'Nathan@yesenia.net',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'Nathan@yesenia.net',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'test@gmail.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'clara@test.com',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
),
(
    'Pierre@test.fr',
    '$2b$10$hVjaq5YMTbZIVq8oF6Edj.Xvth4cH6g/G5M95wHEyD02P4Axizsp6',
    'student'
);

INSERT INTO
    mentors (
        firstname,
        lastname,
        description,
        imgUrl,
        title,
        githubUrl,
        linkedinUrl,
        userId
    )
VALUES (
        'Marie',
        'Delaire',
        'Super Mentor !!!',
        './assets/marieD.webp',
        'Developpeuse Web React spécialisé UX/UI',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        1
    ),
    (
        'Mathieu',
        'Chauchau',
        "Developpeur en herbe, que du talent a l'état brut",
        './assets/chauchau.jpg',
        'Developpeur Web Front-end Angular',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        2
    ),
    (
        'Mahdi',
        'Mcheik',
        '',
        './assets/Mahdi.jpg',
        'Developpeur Web FullStack Binaire',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        3
    ),
    (
        'Raphael',
        'Bard',
        "Trés bon en SCSS mais c'est tout",
        './assets/RaphC.jpg',
        'Developpeur Web | Integrateur de génie',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        4
    ),
    (
        'Aurore',
        'Valeix',
        'Il va vous chercher partout',
        './assets/AuroreC.jpg',
        'DevOps en herbe',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        5
    ),
    (
        'Nassime',
        'Harmach',
        '',
        './assets/NassimeC.jpg',
        'Concepteur de package Expert Npm',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        6
    ),
    (
        'Victor',
        'Garcia',
        '',
        './assets/VictoreGarciaC.jpg',
        'Developpeur Web sous cafeine',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        7
    ),
    (
        'Adam',
        'Hermamou',
        '',
        './assets/AdamC.jpg',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        8
    ),
    (
        'Pierre Louis',
        'Bastin',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        9
    ),
    (
        'Angeline',
        'lineline',
        '',
        './assets/Angeline.jpeg',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        10
    );

INSERT INTO
    students (
        firstname,
        lastname,
        description,
        imgUrl,
        title,
        githubUrl,
        linkedinUrl,
        userId
    )
VALUES (
        'Marie S',
        'Delaire',
        'Super Mentor !!!',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        11
    ),
    (
        'Mahdi',
        'Mcheik',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        12
    ),
    (
        'Nassime S',
        'Harmach',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        13
    ),
    (
        'Pierre S',
        'Dupont',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        14
    ),
    (
        'Pierre S',
        'Dupont',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        15
    ),
    (
        'test S',
        'test',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        16
    ),
    (
        'Nassime S',
        'Harmach',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        17
    ),
    (
        'Pierre S',
        'Dupont',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        18
    ),
    (
        'Pierre S',
        'Dupont',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        19
    ),
    (
        'test S',
        'test',
        '',
        'https://picsum.photos/200/300',
        'Dev Web',
        'https://www.github.com/',
        'https://www.linkedin.com/',
        20
    );

INSERT INTO
    favorite_mentor_student (studentId, mentorId)
VALUES (2, 1),
    (3, 2),
    (1, 2);

INSERT INTO
    skills (name)
VALUES ('javascript'),
    ('C plus plus'),
    ('C Sharp'),
    ('java'),
    ('html'),
    ('css'),
    ('angular'),
    ('react'),
    ('spring'),
    ('node');

INSERT INTO
    languages (name)
VALUES ('français'),
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

INSERT INTO
    user_languages (userId, languageId)
SELECT DISTINCT
    FLOOR(RAND() * 10) + 1 AS userId,
    FLOOR(RAND() * 10) + 1 AS languageId
FROM information_schema.tables t1, information_schema.tables t2
LIMIT 50;

INSERT INTO
    user_skills (userId, skillId)
SELECT DISTINCT
    FLOOR(RAND() * 10) + 1 AS userId,
    FLOOR(RAND() * 10) + 1 AS skillId
FROM information_schema.tables t1, information_schema.tables t2
LIMIT 50;

INSERT INTO
    formations (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Certification en développement web',
        'Tech Academy',
        '2023-02-15',
        '2023-05-20',
        'Paris',
        'France',
        1
    );

-- Exemple 2 : Formation en gestion de projet
INSERT INTO
    formations (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Diplôme en gestion de projet',
        'Business School',
        '2022-09-10',
        '2023-01-15',
        'New York',
        'USA',
        1
    );

-- Exemple 3 : Formation en marketing digital
INSERT INTO
    formations (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Certificat en marketing numérique',
        'Digital Marketing Institute',
        '2023-03-25',
        NULL,
        'London',
        'UK',
        2
    );
-- Exemple 4 : Formation en langues
INSERT INTO
    formations (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Cours d''anglais avancé',
        'Language Institute',
        '2023-06-10',
        '2023-08-20',
        'Madrid',
        'Spain',
        2
    );

-- Exemple 5 : Formation en finance
INSERT INTO
    formations (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Certification en analyse financière',
        'Finance Academy',
        '2023-01-05',
        '2023-04-15',
        'Toronto',
        'Canada',
        3
    );

-- Exemple 6 : Formation en développement personnel
INSERT INTO
    formations (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Atelier de développement personnel',
        'Self-Improvement Center',
        '2023-09-20',
        '2023-10-15',
        'Sydney',
        'Australia',
        3
    );

INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Certification en développement web',
        'Tech Academy',
        '2023-02-15',
        '2023-05-20',
        'Paris',
        'France',
        1
    );

-- Exemple 2 : Formation en gestion de projet
INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Diplôme en gestion de projet',
        'Business School',
        '2022-09-10',
        '2023-01-15',
        'New York',
        'USA',
        1
    );

-- Exemple 3 : Formation en marketing digital
INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Product Owner',
        'Inoxia',
        '2023-03-25',
        NULL,
        'Bordeaux',
        'France',
        2
    );
-- Exemple 4 : Formation en langues
INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Cours d''anglais avancé',
        'Language Institute',
        '2023-06-10',
        '2023-08-20',
        'Madrid',
        'Spain',
        2
    );

-- Exemple 5 : Formation en finance
INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Certification en analyse financière',
        'Finance Academy',
        '2023-01-05',
        '2023-04-15',
        'Toronto',
        'Canada',
        3
    );

-- Exemple 6 : Formation en développement personnel
INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Atelier de développement personnel',
        'Self-Improvement Center',
        '2023-09-20',
        '2023-10-15',
        'Sydney',
        'Australia',
        3
    );

CREATE TABLE slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dateTime DATETIME,
    dateEnd DATETIME,
    visio BOOLEAN,
    mentorId INT,
    FOREIGN KEY (mentorId) REFERENCES mentors (userId)
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255),
    message TEXT,
    slotId INT,
    userId INT,
    FOREIGN KEY (slotId) REFERENCES slots (id),
    FOREIGN KEY (userId) REFERENCES users (id)
);

INSERT INTO
    slots (dateTime, visio, mentorId)
VALUES (NOW(), true, 1),
    (
        DATE_ADD(NOW(), INTERVAL 1 HOUR),
        true,
        2
    ),
    (
        DATE_ADD(NOW(), INTERVAL 2 HOUR),
        false,
        1
    ),
    (
        DATE_ADD(NOW(), INTERVAL 1 DAY),
        true,
        3
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            INTERVAL 1 HOUR
        ),
        false,
        2
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            INTERVAL 2 HOUR
        ),
        true,
        3
    ),
    (
        DATE_ADD(NOW(), INTERVAL 3 HOUR),
        true,
        2
    ),
    (
        DATE_ADD(NOW(), INTERVAL 4 HOUR),
        false,
        1
    ),
    (
        DATE_ADD(NOW(), INTERVAL 2 DAY),
        true,
        3
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 2 DAY),
            INTERVAL 4 HOUR
        ),
        false,
        2
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 2 DAY),
            INTERVAL 5 HOUR
        ),
        true,
        3
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 2 DAY),
            INTERVAL 2 HOUR
        ),
        true,
        2
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 2 DAY),
            INTERVAL 3 HOUR
        ),
        false,
        1
    ),
    (
        DATE_ADD(NOW(), INTERVAL 3 DAY),
        true,
        3
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 3 DAY),
            INTERVAL 1 HOUR
        ),
        false,
        2
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 3 DAY),
            INTERVAL 2 HOUR
        ),
        true,
        3
    ),
    (
        '2023-05-20 10:00:00',
        false,
        1
    ),
    (
        DATE_ADD(NOW(), INTERVAL 7 DAY),
        true,
        1
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 3 DAY),
            INTERVAL 1 HOUR
        ),
        false,
        1
    ),
    (
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 3 DAY),
            INTERVAL 2 HOUR
        ),
        true,
        1
    ),
    (
        '2023-05-20 10:00:00',
        false,
        1
    ),
    (
        DATE_ADD(NOW(), INTERVAL 7 DAY),
        true,
        1
    );

INSERT INTO
    reservations (
        subject,
        message,
        slotId,
        userId
    )
VALUES ('Sujet 1', 'Message 1', 1, 11),
    ('Sujet 2', 'Message 2', 2, 12),
    ('Sujet 3', 'Message 3', 4, 13),
    ('Sujet 4', 'Message 4', 3, 14),
    ('Sujet 5', 'Message 5', 5, 15),
    ('Sujet 6', 'Message 6', 6, 11),
    ('Sujet 7', 'Message 7', 7, 12),
    ('Sujet 8', 'Message 8', 8, 11),
    ('Sujet 9', 'Message 9', 9, 15),
    (
        'Sujet 16',
        'Message 16',
        16,
        12
    ),
    (
        'Sujet 10',
        'Message 10',
        10,
        16
    ),
    (
        'Sujet 11',
        'Message 11',
        11,
        17
    ),
    (
        'Sujet 12',
        'Message 12',
        12,
        18
    );

INSERT INTO
    experiences (
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
    )
VALUES (
        'Atelier de développement personnel',
        'Self-Improvement Center',
        '2023-09-20',
        '2023-10-15',
        'Sydney',
        'Australia',
        3
    );