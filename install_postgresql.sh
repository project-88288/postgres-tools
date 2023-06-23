
sudo apt update
sudo apt install postgresql postgresql-contrib
psql --version
sudo service postgresql start
service postgresql status

cd /home/chaiya/postgres-tools
sudo -u postgres createdb workermainnet

cd /home/chaiya/postgres-tools
sudo -u postgres psql -c "CREATE USER dev WITH PASSWORD 'dev';"

cd /home/chaiya/postgres-tools
sudo -u postgres psql -c "grant all privileges on database workermainnet to dev;"
