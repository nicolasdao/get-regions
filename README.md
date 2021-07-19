# get-regions

List/search the code names for all the AWS and GCP (Google Cloud Platform) regions and copy the selected one to the clipboard.

```
npx get-regions
```

Example:

AWS:
```
af-south-1 - Africa (Cape Town)
ap-east-1 - Asia Pacific (Hong Kong)
ap-northeast-1 - Asia Pacific (Tokyo)
ap-northeast-2 - Asia Pacific (Seoul)
ap-northeast-3 - Asia Pacific (Osaka-Local)
ap-south-1 - Asia Pacific (Mumbai)
ap-southeast-1 - Asia Pacific (Singapore)
ap-southeast-2 - Asia Pacific (Sydney)
...
```

GCP:
```
asia-east1-a - Changhua County, Taiwan, APAC
asia-east1-b - Changhua County, Taiwan, APAC
asia-east1-c - Changhua County, Taiwan, APAC
asia-east2-a - Hong Kong, APAC
asia-east2-b - Hong Kong, APAC
asia-east2-c - Hong Kong, APAC
asia-northeast1-a - Tokyo, Japan, APAC
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