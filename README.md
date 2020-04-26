# JavaScript Project


## Instalacja zależności
```bash
npm install
```


## Uruchomienie serwera deweloperskiego
```bash
npm start
```


## Budowa aplikacji produkcyjnej
```bash
npm run production
```


# Synchronizacja forka


## Wersja SSH
```bash
git remote add upstream git@github.com:cdv-poznan/javascript-project-starter.git

git fetch upstream

git rebase upstream/master
```


## Wersja HTTPS
```bash
git remote add upstream https://github.com/cdv-poznan/javascript-project-starter.git

git fetch upstream

git rebase upstream/master
```

> Jeśli `remote` o nazwie `upstream` istnieje wykonaj `git remote remove upstream`



# Git

## Stash

```
git stash save
```
