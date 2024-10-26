import os

def rename_files_with_first_three_symbols():
    # Get the directory where the script is located
    folder_path = os.path.dirname(os.path.abspath(__file__))

    # List all files in the directory
    files = os.listdir(folder_path)

    # Loop through each file in the directory
    for file_name in files:
        # Construct the full file path
        old_file_path = os.path.join(folder_path, file_name)
        
        # Extract the first three symbols of the original file name
        new_file_name = file_name[:3] + os.path.splitext(file_name)[1]

        # Construct the new file path
        new_file_path = os.path.join(folder_path, new_file_name)

        # Rename the file
        os.rename(old_file_path, new_file_path)

# Call the function to rename files with the first three symbols of their original names
rename_files_with_first_three_symbols()
