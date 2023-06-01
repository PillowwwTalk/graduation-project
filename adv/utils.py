import json
import numpy as np
import matplotlib.pyplot as plt
import torch
import torchvision
import torchvision.datasets as dsets
import torchvision.transforms as transforms


def image_folder_custom_label(root, transform, idx2label):
    # custom_label
    # type : List
    # index -> label
    # ex) ['tench', 'goldfish', 'great_white_shark', 'tiger_shark']

    old_data = dsets.ImageFolder(root=root, transform=transform)
    old_classes = old_data.classes

    label2idx = {}

    for i, item in enumerate(idx2label):
        label2idx[item] = i

    new_data = dsets.ImageFolder(root=root, transform=transform,
                                 target_transform=lambda x: idx2label.index(old_classes[x]))
    new_data.classes = idx2label
    new_data.class_to_idx = label2idx

    return new_data

MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]
# https://s3.amazonaws.com/deep-learning-models/image-models/imagenet_class_index.json
class_idx = json.load(open("imagenet_class_index.json"))
idx2label = [class_idx[str(k)][1] for k in range(len(class_idx))]
transform = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(), # ToTensor : [0, 255] -> [0, 1]
    transforms.Normalize(mean=MEAN, std=STD)
])
imagnet_data = image_folder_custom_label(root='imagenet',
                                         transform=transform,
                                         idx2label=idx2label)
data_loader = torch.utils.data.DataLoader(imagnet_data, batch_size=50, shuffle=False)
print("Used normalization: mean=", MEAN, "std=", STD)
images, labels = next(iter(data_loader))
print(labels)
