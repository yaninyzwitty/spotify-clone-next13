const {BlobServiceClient, StorageSharedKeyCredential, BlobSASPermissions, generateBlobSASQueryParameters } = require('@azure/storage-blob');
// blboserviceaccount --> creating containers
// StorageSharedKeyCredential ---authhenticating and authorizing request to the object storage account usign shared key credential

// BlobSASPermissions--> The BlobSASPermissions object defines the permissions that can be associated with a Shared Access Signature (SAS) for a blob.
// generateAccountSASQueryParameters -unction is used to generate a query string for an blob-level SAS (Shared Access Signature) for the Azure Blob storage service.

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = "images"; //can be vids--> any

// ---do azure storage create blob container -->

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );


  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );


async function generateSASToken() {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const permissions = new BlobSASPermissions();
    permissions.write = true;
    permissions.create = true;
    permissions.read = true;
  

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);

    const sasToken = generateBlobSASQueryParameters(
        {
            containerName: containerClient.containerName,
            permissions: permissions.toString(),
            expiresOn: expiryDate,

        },
        sharedKeyCredential
    ).toString(); //encoding it to string so that it can be appended to url;

    return sasToken;

}
module.exports = generateSASToken;