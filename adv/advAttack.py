from __future__ import print_function

import cv2
import numpy as np
import ssl
import torchattacks
from PIL import Image
from torch.autograd import Variable
from torchvision import transforms

from advSafety import *
ssl._create_default_https_context = ssl._create_unverified_context


def generate_img(image_path):
    MEAN = [0.485, 0.456, 0.406]
    STD = [0.229, 0.224, 0.225]
    input_image = Image.open(image_path)
    preprocess = transforms.Compose([
        transforms.Resize((299, 299)),
        transforms.ToTensor(),
        transforms.Normalize(mean=MEAN, std=STD)
    ])
    input_tensor = preprocess(input_image)
    input_batch = input_tensor.unsqueeze(0)
    return input_batch


def choose_Attack(model, img, attack, label):
    if attack == 'FGSM':
        atk = torchattacks.FGSM(model, eps=8/255)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
        # return fast_gradient_method(model, img.data, 0.1, np.inf)
    elif attack == 'DIFGSM':
        atk = torchattacks.DIFGSM(model)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
    elif attack == 'TIFGSM':
        atk = torchattacks.TIFGSM(model)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
    elif attack == 'NIFGSM':
        atk = torchattacks.NIFGSM(model)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
    elif attack == 'SINIFGSM':
        atk = torchattacks.SINIFGSM(model)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
    elif attack == 'VMIFGSM':
        atk = torchattacks.VMIFGSM(model)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
    elif attack == 'PGD':
        atk = torchattacks.PGD(model, eps=8 / 255, alpha=2 / 225, steps=10, random_start=True)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        # atk.set_mode_targeted_least_likely()
        return atk(img.data, label)
        # return projected_gradient_descent(Model, img.data, 0.1, 0.05, 40, np.inf)
    elif attack == 'CW L2':
        atk = torchattacks.CW(model, c=1, steps=1000, lr=0.01)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        return atk(img.data, label)
    elif attack == 'DeepFool':
        atk = torchattacks.DeepFool(model)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        return atk(img.data, label)
    elif attack == 'JSMA':
        atk = torchattacks.JSMA(model, gamma=0.1)
        atk.set_normalization_used(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        return atk(img.data, label)


def model_Attack(model, attack, img, device):
    url, filename = ("Imagenet_labels_map.txt", "Imagenet_labels_map.txt")
    labels_map = json.load(open(filename))
    labels_map = [labels_map[str(i)] for i in range(1000)]
    list_data1 = []
    list_data2 = []
    if model == 'AlexNet':
        Model = models.alexnet(weights=AlexNet_Weights.DEFAULT).to(device).eval()
    elif model == 'VGG-16':
        Model = models.vgg16(weights=VGG16_Weights.DEFAULT).to(device).eval()
    elif model == 'VGG-19':
        Model = models.vgg19(weights=VGG19_Weights.DEFAULT).to(device).eval()
    elif model == 'ResNet50':
        Model = models.resnet50(weights=ResNet50_Weights.DEFAULT).to(device).eval()
    elif model == 'ResNet101':
        Model = models.resnet101(weights=ResNet101_Weights.DEFAULT).to(device).eval()
    elif model == 'ResNet152':
        Model = models.resnet152(weights=ResNet152_Weights.DEFAULT).to(device).eval()
    target = np.argmax(Model(img).data.cpu().numpy())
    target = Variable(torch.Tensor([float(target)]).to(device).long())
    print("label={}".format(target))
    adv_example = choose_Attack(Model, img, attack, target)
    adv_target = torch.max(Model(adv_example), 1)[1]
    print(adv_target)
    if adv_target != target:
        status = 'Success'
        print("adver_target={}".format(adv_target))
        print("-----")
        with torch.no_grad():
            logits = Model(img)
        preds = torch.topk(logits, k=5).indices.squeeze(0).tolist()
        for idx in preds:
            label = labels_map[idx]
            prob = torch.softmax(logits, dim=1)[0, idx].item()
            list_data1.append({'label': idx, 'model': model, 'prob': round(prob * 100, 2)})
            print(f"{label:<25} ({prob * 100:.2f}%)")
        json_data1 = json.dumps(list_data1)
        with torch.no_grad():
            logits = Model(adv_example)
        preds = torch.topk(logits, k=5).indices.squeeze(0).tolist()
        for idx in preds:
            label = labels_map[idx]
            prob = torch.softmax(logits, dim=1)[0, idx].item()
            list_data2.append({'label': idx, 'model': model, 'prob': round(prob * 100, 2)})
            print(f"{label:<25} ({prob * 100:.2f}%)")
        json_data2 = json.dumps(list_data2)
        return adv_example, str(adv_target), status, str(target), json_data1, json_data2
    else:
        status = 'Error'
        print("失败")
        return adv_example, str(adv_target), status, str(target), 'None', 'None'




