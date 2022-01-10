"use strict";(self.webpackChunkKuiClientTemplate=self.webpackChunkKuiClientTemplate||[]).push([[6046],{93455:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});const a='---\ntitle: Example &mdash; Getting Started with Fybrik\nlayout:\n    1: left\n---\n\n# Getting to Know Fybrik\n\n[Fybrik](https://fybrio.io) offers *low-touch* regulation of data\naccess, so that:\n\n1. **Data owners** add data sets to a catalog.\n2. **Data stewards** specify policies that help Fybrik automate the\n   brokering of a request for data.\n3. **Data users** request access to data sets, and in response receive\n   *use-specific credentials and endpoints*.\n   \nThese use-specific endpoints will serve up data in a way that is\n*automatically* subsetted and redacted, according to the policies\napplicable to that request.\n\n---\n\n=== "Introduction"\n\n    > ### Low Touch Regulation\n    >\n    > Neither data stewards nor data owners are involved in any of the\n    > mechanics of processing data access requests.\n\n    ## A Motivating Example\n\n    Fybrik helps govern access to data. Let\'s work through an example of a\n    file stored in an S3 bucket, and a simple client that wants to `cat`\n    the contents of that file: `PS_20174392719_1491204439457_log.csv` in a\n    bucket named `fybrik-demo`.\n\n    ### Create a namespace for the sample\n\n    To isolate our work, let us first create a new Kubernetes namespace.\n\n    ```bash\n    ---\n    id: create-sample-namespace\n    validate: kubectl get namespace fybrik-demo\n    ---\n    kubectl create namespace fybrik-demo\n    ```\n\n    > ### Our Simple Client\n    >\n    > To demonstrate how Fybrik regulates data access, let us see what\n    > might happen, as a data user, when trying to access a protected data\n    > set *without Fybrik*. \n    >\n    > To keep things simple, we can start by using the `aws s3api` CLI to\n    > access the data, and `kubectl run` to launch a pod that attempts to\n    > access that file. We would expect an error such as **"Unable to\n    > locate credentials"**, because that pod does not have authority to\n    > access the desired S3 file.\n\n    ```shell\n    # Use kubectl run and the aws CLI to fetch our data file\n    kubectl delete pod/fybrik-simple-client -n fybrik-demo || true \\ &&\n    kubectl run fybrik-simple-client -n fybrik-demo --image=amazon/aws-cli --restart=Never -- \\\n        --endpoint-url=http://localstack.fybrik-demo.svc.cluster.local:4566 \\\n        s3api head-object \\\n        --bucket fybrik-demo --key PS_20174392719_1491204439457_log.csv\n\n    # Wait for our simple job to complete\n    kubectl wait pod/fybrik-simple-client -n fybrik-demo --for=condition=Ready > /dev/null && \\\n        kubectl wait pod/fybrik-simple-client -n fybrik-demo --for=condition=Ready=false > /dev/null && \\\n        [[ $(kubectl get pod/fybrik-simple-client -n fybrik-demo -o=jsonpath={.status.phase}) = Succeeded ]] || false\n\n    # Gather the logs from our client\n    kubectl logs pod/fybrik-simple-client -n fybrik-demo\n    ```\n\n=== "Set up S3"\n\n    # Setting up an Example Data Set\n\n    This guidebook uses a sample of 100 lines of a CSV file from the\n    [Synthetic Financial Datasets For Fraud\n    Detection](https://www.kaggle.com/ealaxi/paysim1) dataset[^1], and\n    uses the [AWS CLI](https://aws.amazon.com/cli/) to upload the dataset\n    to S3.\n\n    - **[Deploy an S3 Service](#kui-link-install-s3)** *blank* We\n      will use [LocalStack](https://localstack.cloud/) to provide an S3\n      service.\n    - **[Provide API access to that S3 bucket](#kui-link-start-s3)** *minor*\n      Set up a port-forward to the LocalStack service.\n    - **[Upload the dataset to S3](#kui-link-upload-dataset)** *blank* We\n      will create an S3 bucket, and upload our csv file to this bucket.\n\n    [^1]: Created by NTNU and shared under the ***CC BY-SA 4.0*** license.\n\n\n    ## Install LocalStack\'s S3 Service\n\n    [LocalStack](https://localstack.cloud/) gives us a quick way to\n    provision an S3 service in our cluster. Install localstack to the\n    currently active namespace and wait for it to be ready:\n\n    ```bash\n    ---\n    id: install-s3\n    validate: helm status localstack -n fybrik-demo\n    ---\n    helm repo add localstack-charts https://localstack.github.io/helm-charts\n    helm install localstack localstack-charts/localstack -n fybrik-demo \\\n        --set startServices=s3 \\\n        --set service.type=ClusterIP\n    ```\n\n    Now we can map the S3 service to a local port:\n\n    ```bash\n    ---\n    id: start-s3\n    ---\n    kill $(lsof -t -i:4566) > /dev/null 2> /dev/null || true\n    kubectl port-forward svc/localstack 4566:4566 -n fybrik-demo &\n    ```\n\n    ## Upload Data to S3\n\n    ```bash\n    ---\n    id: upload-dataset\n    validate: aws --endpoint-url=http://127.0.0.1:4566 s3api head-object --bucket fybrik-demo --key PS_20174392719_1491204439457_log.csv\n    ---\n    export FILEPATH=$(mktemp)\n\n    echo "Fetching dataset"\n    curl https://git.io/JyCP5 -r 0-9999 | head -100 > "$FILEPATH"\n\n    aws configure set aws_access_key_id $(uuidgen)\n    aws configure set aws_secret_access_key $(uuidgen)\n\n    echo "Creating bucket"\n    aws --endpoint-url=http://127.0.0.1:4566 s3api create-bucket \\\n        --bucket fybrik-demo\n\n    echo "Uploading data to s3"\n    aws --endpoint-url=http://127.0.0.1:4566 s3api put-object \\\n        --bucket fybrik-demo \\\n        --key PS_20174392719_1491204439457_log.csv \\\n        --body "$FILEPATH"\n    ```\n\n=== "Data Owners"\n\n    # Fyrik Tasks for Data Owners\n\n    As a data owner you upload a dataset and register it in a data catalog.\n\n    ## Activities\n\n    - **[Install Fybrik on your cluster](#kui-link-install-fybrik)**\n      *minor* We will use the built-in catalog, Open Policy Agent (OPA),\n      and the Apache Arrow Flight module.\n    - **[Prepare the sample data set](#kui-link-example-dataset)** *minor*\n    - **[Create namespace for this\n    scenario](#kui-link-create-sample-namespace)** *blank* This enables easy\n    [cleanup](#cleanup) once you\'re done experimenting with the sample.\n    - **[Register the dataset](#kui-link-register-dataset)** *blank* Teach\n      Fybrik about this dataset, its URI, access credentials, and which\n      portions of the dataset are PII.\n\n    ??? tip "Before you begin, check your prerequisites"\n\n        === "Fybrik Operators"\n\n            This command sequence will determine whether Fybrik has been successfully installed in your current Kubernetes context.\n\n            ```bash\n            ---\n            id: install-fybrik\n            validate: $body\n            ---\n            (helm status cert-manager -n cert-manager) && (helm status vault -n fybrik-system) && (helm status fybrik-crd -n fybrik-system) && (helm status fybrik -n fybrik-system) && (kubectl get FybrikModule arrow-flight-module -n fybrik-system)\n            ```\n\n        === "Example Data Set"\n\n            ```bash\n            ---\n            id: example-dataset\n            validate: $body\n            ---\n            aws --endpoint-url=http://127.0.0.1:4566 s3api head-object --bucket fybrik-demo --key PS_20174392719_1491204439457_log.csv\n            ```\n\n    ## Create a namespace for the sample\n\n    Create a new Kubernetes namespace to isolate our work.\n\n    ```bash\n    ---\n    id: create-sample-namespace\n    validate: kubectl get namespace fybrik-demo\n    ---\n    kubectl create namespace fybrik-demo\n    ```\n\n    ## Register the dataset in a data catalog\n\n    Register the credentials required for accessing the dataset. We will use the values for `access_key` and `secret_key` that we set up when [preparing the data set](./dataset.md).\n\n    ```bash\n    ---\n    id: register-dataset-secret\n    validate: kubectl get Secret paysim-csv -n fybrik-demo\n    ---\n    kubectl create secret generic paysim-csv -n fybrik-demo \\\n        --from-literal access_key=$(aws configure get aws_access_key_id | base64) \\\n        --from-literal secret_key=$(aws configure get aws_secret_access_key | base64)\n    ```\n\n    Then, register the data asset itself in the catalog. Replace the values for `endpoint`, `bucket` and `objectKey` with values from the object storage service that you used and run:\n\n    ```bash\n    ---\n    id: register-dataset\n    validate: kubectl get Asset.katalog.fybrik.io paysim-csv -n fybrik-demo\n    ---\n    kubectl apply -n fybrik-demo -f plugins/plugin-kubectl/tests/data/k8s/fybrik/asset.yml\n    ```\n\n    The asset is now registered in the catalog. The identifier of the asset is `fybrik-demo/paysim-csv` (i.e. `<namespace>/<name>`). You will use that name in the `FybrikApplication` later.\n\n=== "Data Stewards"\n\n    # Fyrik Tasks for Data Stewards\n\n    As a data steward you define policies that govern if and how to grant\n    access to a [data user\'s request for access](./data-user.md) to the\n    data sets [registered by the data owner](./data-owner.md).\n\n    ## Activities\n\n    - **[Install Fybrik on your cluster](#kui-link-install-fybrik)**\n      *minor* We will use the built-in catalog, Open Policy Agent (OPA),\n      and the Apache Arrow Flight module.\n    - **[Have the Data Owner define an Asset](#kui-link-data-owner-tasks)** *minor*\n    - **[Define access policy](#kui-link-define-access-policy)** *blank* Define\n      an OpenPolicyAgent policy to redact the columns tagged as PII.\n\n    ??? tip "Before you begin, check your prerequisites"\n\n        === "Fybrik Operators"\n\n            This command sequence will determine whether Fybrik has been successfully installed in your current Kubernetes context.\n\n            ```bash\n            ---\n            id: install-fybrik\n            validate: $body\n            ---\n            (helm status cert-manager -n cert-manager) && (helm status vault -n fybrik-system) && (helm status fybrik-crd -n fybrik-system) && (helm status fybrik -n fybrik-system) && (kubectl get FybrikModule arrow-flight-module -n fybrik-system)\n            ```\n\n        === "Data Owner Tasks"\n\n            ```bash\n            ---\n            id: data-owner-tasks\n            validate: $body\n            ---\n            kubectl get Asset.katalog.fybrik.io paysim-csv -n fybrik-demo\n            ```\n\n    ## Define data access policies\n\n    To regulate access to data, the data steward may define a set of data\n    access policies. Fybrik supports the\n    [OpenPolicyAgent](https://www.openpolicyagent.org/) scheme. For\n    example, a policy may redact columns of data tagged as `PII` for\n    datasets tagged with `finance`. Below is the policy, written in the\n    [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/#what-is-rego)\n    language.\n\n    ```rego\n    package dataapi.authz\n\n    rule[{"action": {"name":"RedactAction", "columns": column_names}, "policy": description}] {\n      description := "Redact columns tagged as PII in datasets tagged with finance = true"\n      input.action.actionType == "read"\n      input.resource.tags.finance\n      column_names := [input.resource.columns[i].name | input.resource.columns[i].tags.PII]\n      count(column_names) > 0\n    }\n    ```\n\n    In this sample only the policy above is applied. Copy the policy to a file named `sample-policy.rego` and then run:\n\n    ```bash\n    ---\n    id: define-access-policy\n    validate: "kubectl get cm sample-policy -n fybrik-system -o jsonpath=\'{.metadata.annotations.openpolicyagent\\\\.org/policy-status}\' | grep ok"\n    ---\n    kubectl -n fybrik-system delete configmap sample-policy\n    kubectl -n fybrik-system create configmap sample-policy \\\n        --from-literal=policy="$(echo H4sIAJcCymEAA12PwWrDMAyG73kK4VMLw+wcaGHH3sbYLYQhbDU1Sx1jy4w2y7tPSUwXerLR//nzr4DmGzsCi4wYnMbMl3tVxdxTMyo07AavahiVxyupWn2QleHbOn8BZYY+X30SZL19zVyaJAlD78xNAkvJRBfmF1MLYwXbCdQHKNJiSMDYdWQBE7yfTuD8Ui4RP5Ifxxc4O4/eEByAYyYlWudDZr12LsfnLQghX0RC+89ESkOOhrQIky4mSbc7zM2aJ7w0bFyrZwZ+n30bYFHLAu3izZ53W/sejvBaTX9fY7LDfwEAAA== | base64 -d | gunzip)"\n    kubectl -n fybrik-system label configmap sample-policy openpolicyagent.org/policy=rego\n\n    while [[ $(kubectl get cm sample-policy -n fybrik-system -o \'jsonpath={.metadata.annotations.openpolicyagent\\\\.org/policy-status}\') != \'{"status":"ok"}\' ]]; do echo "waiting for policy to be applied" && sleep 5; done\n    ```\n\n    You can similarly apply a directory holding multiple rego files.\n\n=== "Data Users"\n\n    # Fyrik Tasks for Data Users\n\n    When coding your application, you may need to acquire access to one or\n    more data sets. With Fybrik, you do so by filing a request, in the\n    form of a `FybrikApplication` Kubernetes resource. \n\n    Fybrik then automatically processes this request. If all goes well,\n    the request will succeed and the endpoint and credentials will be made\n    available as properties of that Kubernetes resource.\n\n    At this point, you may extract those bits of information, and\n    integrate them into your application.\n\n    ## Activities\n\n    - **[Install Fybrik on your cluster](#kui-link-install-fybrik)**\n      *minor* We will use the built-in catalog, Open Policy Agent (OPA),\n      and the Apache Arrow Flight module.\n    - **[Have the Data Owner define an Asset](#kui-link-data-owner-tasks)** *minor*\n    - **[Have the Data Steward define the regulatory policies](#kui-link-data-steward-tasks)** *minor*\n    - **[Create a data access request](#kui-link-create-request)** *blank*\n      In Fybrik, a Kubernetes resource of type `FybrikApplication`\n      represents such a request.\n\n    ??? tip "Before you begin, check your prerequisites"\n\n        === "Fybrik Operators"\n\n        This command sequence will determine whether Fybrik has been successfully installed in your current Kubernetes context.\n\n        ```bash\n        ---\n        id: install-fybrik\n        validate: $body\n        ---\n        (helm status cert-manager -n cert-manager) && (helm status vault -n fybrik-system) && (helm status fybrik-crd -n fybrik-system) && (helm status fybrik -n fybrik-system) && (kubectl get FybrikModule arrow-flight-module -n fybrik-system)\n        ```\n\n        === "Data Owner Tasks"\n\n        ```bash\n        ---\n        id: data-owner-tasks\n        validate: $body\n        ---\n        kubectl get Asset.katalog.fybrik.io paysim-csv -n fybrik-demo\n        ```\n\n        === "Data Steward Tasks"\n\n        ```bash\n        ---\n        id: data-steward-tasks\n        validate: $body\n        ---\n        kubectl get cm sample-policy -n fybrik-system -o jsonpath=\'{.metadata.annotations.openpolicyagent\\.org/policy-status}\' | grep ok\n        ```\n\n    ## Request Data Access\n\n    === "Create Request"\n    Create a [`FybrikApplication`](../reference/crds.md#fybrikapplication) resource to register your workload to the control plane of Fybrik: \n\n    \x3c!-- TODO: role field removed but code still requires it --\x3e\n    ```bash\n    kubectl apply -n fybrik-demo -f plugins/plugin-kubectl/tests/data/k8s/fybrik/application.yaml\n    ```\n\n    Once the application status turns green, you will know that Fybrik has verified the policies established by the data steward, and granted your application an endpoint and credentials to access the data set.\n\n    === "Notes"\n\n    In this resource definition:\n\n    * The `selector` field matches the labels of our workload.\n    * The `data` field includes a `dataSetID` that matches the asset identifier in the catalog.\n    * The `protocol` and `dataformat` indicate that the developer wants to consume the data using Apache Arrow Flight.\n\n    ## Read the dataset, using our endpoint and credentials\n\n    In your **terminal**, run the following command to print the [endpoint](https://fybrio.io/reference/crds/#fybrikapplicationstatusreadendpointsmapkey) to use for reading the data. It fetches the code from the `FybrikApplication` resource:\n\n    ```bash\n    SCHEME=$(kubectl get fybrikapplication my-application -o jsonpath={.status.assetStates.fybrik-notebook-sample/paysim-csv.endpoint.scheme})\n    HOSTNAME=$(kubectl get fybrikapplication my-application -o jsonpath={.status.assetStates.fybrik-notebook-sample/paysim-csv.endpoint.hostname})\n    PORT=$(kubectl get fybrikapplication my-application -o jsonpath={.status.assetStates.fybrik-notebook-sample/paysim-csv.endpoint.port})\n    export DATA_URI="${SCHEME}://${HOSTNAME}:${PORT}"\n    ```\n\n    Finally, we can repeat our [initial attempt to access the data set](./index.md).\n'}}]);