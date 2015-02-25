sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

sudo apt-get update
sudo apt-get install -y mongodb-org
sudo mkdir /data
sudo mkdir /data/db
service mongod start
sudo apt-get install -y python-software-properties

sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs git vim
sudo npm install -g express
git clone https://github.com/saipramod/swatkats.git
cd swatkats/
sudo npm install
sudo npm start