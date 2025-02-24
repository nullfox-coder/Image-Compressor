# System Architecture
![System Architecture](hld.drawio.svg)

# Component Level Architecture
![Component Level Architecture](lld.drawio.svg)


# CURL -

## I have attached a sample_test_data.csv in my dir to test

 ## Upload
```
curl --location 'http://0.0.0.0:8000/api/upload/' \
--form 'csv=@"/C:/Users/User/Downloads/sample_test_data.csv"'
```

## CheckStatus
```
curl --location 'http://0.0.0.0:8000/api/status/31308b45-0fd8-4896-9cc3-2163641c5d37'
```
# Detailed System Architecture
![Detailed System Architecture](system.drawio.svg)


# Implmentation
![Implmentation](implementation.drawio.svg)