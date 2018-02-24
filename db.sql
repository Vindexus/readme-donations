CREATE ROLE readme-donations WITH LOGIN PASSWORD 'put-your-password-here';
ALTER ROLE readmedonations CREATEDB;
CREATE DABASE readmedonations;
GRANT ALL PRIVILEGES ON DATABASE readmedonations TO readmedonations;