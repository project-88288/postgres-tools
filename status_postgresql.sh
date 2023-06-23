
sudo -u postgres psql -t -c '\l'

cd /home/chaiya/postgres-tools
sudo -u postgres psql -t -c "SELECT 1 FROM pg_user WHERE usename = 'dev';"