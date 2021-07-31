# get-regions

List/search the code names for all the AWS and GCP (Google Cloud Platform) regions and copy the selected one to the clipboard.

```
npx get-regions
```

Example:

AWS:
```
af-south-1a (az) - af-south-1 (region): Africa (Cape Town)
af-south-1b (az) - af-south-1 (region): Africa (Cape Town)
af-south-1c (az) - af-south-1 (region): Africa (Cape Town)
ap-east-1a (az) - ap-east-1 (region): Asia Pacific (Hong Kong)
ap-east-1b (az) - ap-east-1 (region): Asia Pacific (Hong Kong)
ap-east-1c (az) - ap-east-1 (region): Asia Pacific (Hong Kong)
...
```

GCP:
```
asia-east1-a (az) - asia-east1 (region): Changhua County, Taiwan, APAC
asia-east1-b (az) - asia-east1 (region): Changhua County, Taiwan, APAC
asia-east1-c (az) - asia-east1 (region): Changhua County, Taiwan, APAC
asia-east2-a (az) - asia-east2 (region): Hong Kong, APAC
asia-east2-b (az) - asia-east2 (region): Hong Kong, APAC
asia-east2-c (az) - asia-east2 (region): Hong Kong, APAC
...
```

# Alternative commands

To only get AWS regions:
```
npx get-regions --aws
```

To only get GCP regions:
```
npx get-regions --gcp
```

# License

BSD 3-Clause License