
sudo apt update
sudo apt install postgresql postgresql-contrib
psql --version
sudo service postgresql start
service postgresql status

sudo -u postgres createdb workermainnet
sudo -u postgres psql -c "CREATE USER dev WITH PASSWORD 'dev';"
sudo -u postgres psql -c "grant all privileges on database workermainnet to dev;"
