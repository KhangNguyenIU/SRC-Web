import * as Cloudinary from 'cloudinary';

class CloudinaryService {
  private static instance: CloudinaryService;

  static get(): CloudinaryService {
    if (!CloudinaryService.instance) {
        CloudinaryService.instance = new CloudinaryService();
    }
    return CloudinaryService.instance;
  }

  constructor() {}

  init() :CloudinaryService {
    Cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return this;
  }
  async upload(filepath: any)  {
    try{
        const url = await Cloudinary.v2.uploader.upload(filepath)
        return url
    }catch (error){
        throw new Error("Error uploading image")
    }
  }
}

const cloudinary = CloudinaryService.get().init();

export { cloudinary as CloudinaryService };
