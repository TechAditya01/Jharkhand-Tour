import { create } from 'ipfs-http-client';

// IPFS client configuration
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`
    ).toString('base64')}`,
  },
});

export interface TourismItemMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  external_url?: string;
  location?: string;
  category?: string;
  artisan?: string;
}

export async function uploadToIPFS(data: any): Promise<string> {
  try {
    const result = await ipfs.add(JSON.stringify(data));
    return `ipfs://${result.cid.toString()}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload to IPFS');
  }
}

export async function uploadFileToIPFS(file: File): Promise<string> {
  try {
    const result = await ipfs.add(file);
    return `ipfs://${result.cid.toString()}`;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

export async function getFromIPFS(ipfsURI: string): Promise<any> {
  try {
    const cid = ipfsURI.replace('ipfs://', '');
    const stream = ipfs.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk);
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw new Error('Failed to fetch from IPFS');
  }
}

export async function createTourismItemMetadata(
  name: string,
  description: string,
  imageURI: string,
  location: string,
  category: string,
  artisan: string,
  additionalAttributes: { trait_type: string; value: string }[] = []
): Promise<string> {
  const metadata: TourismItemMetadata = {
    name,
    description,
    image: imageURI,
    attributes: [
      { trait_type: 'Location', value: location },
      { trait_type: 'Category', value: category },
      { trait_type: 'Artisan', value: artisan },
      ...additionalAttributes,
    ],
    external_url: `${window.location.origin}/marketplace`,
    location,
    category,
    artisan,
  };

  return await uploadToIPFS(metadata);
}

export async function createExperienceMetadata(
  title: string,
  description: string,
  imageURI: string,
  location: string,
  duration: string,
  difficulty: string
): Promise<string> {
  const metadata: TourismItemMetadata = {
    name: title,
    description,
    image: imageURI,
    attributes: [
      { trait_type: 'Location', value: location },
      { trait_type: 'Duration', value: duration },
      { trait_type: 'Difficulty', value: difficulty },
      { trait_type: 'Type', value: 'Experience' },
    ],
    external_url: `${window.location.origin}/experiences`,
    location,
    category: 'experience',
  };

  return await uploadToIPFS(metadata);
}

// Utility function to get IPFS gateway URL
export function getIPFSGatewayURL(ipfsURI: string): string {
  const cid = ipfsURI.replace('ipfs://', '');
  return `https://ipfs.io/ipfs/${cid}`;
}

// Utility function to get Infura gateway URL (faster)
export function getInfuraGatewayURL(ipfsURI: string): string {
  const cid = ipfsURI.replace('ipfs://', '');
  return `https://infura-ipfs.io/ipfs/${cid}`;
}
