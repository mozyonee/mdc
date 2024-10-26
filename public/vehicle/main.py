from PIL import Image
import os

def trim_images():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # List all files in the directory
    files = os.listdir(script_dir)

    # Loop through each file in the directory
    for file_name in files:
        # Check if the file is an image (you can add more image formats as needed)
        if file_name.endswith(('.jpg', '.jpeg', '.png', '.gif')):
            # Open the image file
            with Image.open(os.path.join(script_dir, file_name)) as img:
                # Trim the image
                trimmed_img = img.crop(img.getbbox())

                # Save the trimmed image
                trimmed_img.save(os.path.join(script_dir, file_name))

# Call the function to trim images in the script directory
trim_images()
