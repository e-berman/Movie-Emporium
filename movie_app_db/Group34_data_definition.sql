-- Queries to create the 8 tables from the project schema

-- Customers Table

CREATE TABLE Customers (
    customer_id int(11) AUTO_INCREMENT NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY(customer_id)
) ENGINE=INNODB;

-- Orders Table

CREATE TABLE Orders (
    order_id int(11) AUTO_INCREMENT NOT NULL,
    customer_id int(11),
    buy_price int(11) NOT NULL,
    rent_price int(11) NOT NULL,
    PRIMARY KEY(order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
) ENGINE=INNODB;

-- Subscriptions Table

CREATE TABLE Subscriptions (
    subscription_id int(11) AUTO_INCREMENT NOT NULL,
    customer_id int(11),
    subscription_level int(11) NOT NULL,
    access_to_rent boolean NOT NULL,
    access_to_buy boolean NOT NULL,
    access_to_stream boolean NOT NULL,
    PRIMARY KEY(subscription_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
) ENGINE=INNODB;

-- PhysMovies Table

CREATE TABLE PhysMovies (
    pmovie_id int(11) AUTO_INCREMENT NOT NULL,
    order_id int(11),
    category_id int(11),
    title varchar(255) NOT NULL,
    year_released int(11) NOT NULL,
    PRIMARY KEY(pmovie_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
) ENGINE=INNODB;

-- StreamMovies Table

CREATE TABLE StreamMovies (
    smovie_id int(11) AUTO_INCREMENT NOT NULL,
    subscription_id int(11),
    category_id int(11),
    title varchar(255) NOT NULL,
    year_released int(11) NOT NULL,
    PRIMARY KEY(smovie_id),
    FOREIGN KEY (subscription_id) REFERENCES Subscriptions(subscription_id)
) ENGINE=INNODB;

-- Categories Table

CREATE TABLE Categories (
    category_id int(11) AUTO_INCREMENT NOT NULL,
    smovie_id int(11),
    pmovie_id int(11),
    genre varchar(255) NOT NULL,
    PRIMARY KEY(category_id),
    FOREIGN KEY (smovie_id) REFERENCES StreamMovies(smovie_id),
    FOREIGN KEY (pmovie_id) REFERENCES PhysMovies(pmovie_id)
) ENGINE=INNODB;

-- StreamMovieCategory Table

CREATE TABLE StreamMovieCategory (
    smoviecategory_id int(11) AUTO_INCREMENT NOT NULL,
    smovie_id int(11),
    category_id int(11),
    PRIMARY KEY(smoviecategory_id),
    FOREIGN KEY (smovie_id) REFERENCES StreamMovies(smovie_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
) ENGINE=INNODB;

-- PhysMovieCategory Table

CREATE TABLE PhysMovieCategory (
    pmoviecategory_id int(11) AUTO_INCREMENT NOT NULL,
    pmovie_id int(11),
    category_id int(11),
    PRIMARY KEY(pmoviecategory_id),
    FOREIGN KEY (pmovie_id) REFERENCES PhysMovies(pmovie_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
) ENGINE=INNODB;
