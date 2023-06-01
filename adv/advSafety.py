import json
import torch
from torchvision import models
from torchvision.models import AlexNet_Weights, VGG19_Weights, ResNet50_Weights, ResNet101_Weights, VGG16_Weights, \
    ResNet152_Weights


def Model_defend(advimg, device):
    # Alexnet model
    list_data = []
    Model = models.alexnet(weights=AlexNet_Weights.DEFAULT).to(device).eval()
    with torch.no_grad():
        logits = Model(advimg)
    preds = torch.topk(logits, k=3).indices.squeeze(0).tolist()
    for idx in preds:
        prob = torch.softmax(logits, dim=1)[0, idx].item()
        list_data.append({'label': idx, 'model': 'Alexnet', 'prob': round(prob*100, 2)})

    # VGG-16 model
    Model = models.vgg16(weights=VGG16_Weights.DEFAULT).to(device).eval()
    with torch.no_grad():
        logits = Model(advimg)
    preds = torch.topk(logits, k=3).indices.squeeze(0).tolist()
    for idx in preds:
        prob = torch.softmax(logits, dim=1)[0, idx].item()
        list_data.append({'label': idx, 'model': 'VGG-16', 'prob': round(prob * 100, 2)})

    # VGG-19 model
    Model = models.vgg19(weights=VGG19_Weights.DEFAULT).to(device).eval()
    with torch.no_grad():
        logits = Model(advimg)
    preds = torch.topk(logits, k=3).indices.squeeze(0).tolist()
    for idx in preds:
        prob = torch.softmax(logits, dim=1)[0, idx].item()
        list_data.append({'label': idx, 'model': 'VGG-19', 'prob': round(prob * 100, 2)})

    # ResNet50 model
    Model = models.resnet50(weights=ResNet50_Weights.DEFAULT).to(device).eval()
    with torch.no_grad():
        logits = Model(advimg)
    preds = torch.topk(logits, k=3).indices.squeeze(0).tolist()
    for idx in preds:
        prob = torch.softmax(logits, dim=1)[0, idx].item()
        list_data.append({'label': idx, 'model': 'ResNet50', 'prob': round(prob * 100, 2)})

    # ResNet101 model:
    Model = models.resnet101(weights=ResNet101_Weights.DEFAULT).to(device).eval()
    with torch.no_grad():
        logits = Model(advimg)
    preds = torch.topk(logits, k=4).indices.squeeze(0).tolist()
    for idx in preds:
        prob = torch.softmax(logits, dim=1)[0, idx].item()
        list_data.append({'label': idx, 'model': 'ResNet101', 'prob': round(prob * 100, 2)})

    # ResNet152 model:
    Model = models.resnet152(weights=ResNet152_Weights.DEFAULT).to(device).eval()
    with torch.no_grad():
        logits = Model(advimg)
    preds = torch.topk(logits, k=4).indices.squeeze(0).tolist()
    for idx in preds:
        prob = torch.softmax(logits, dim=1)[0, idx].item()
        list_data.append({'label': idx, 'model': 'ResNet152', 'prob': round(prob * 100, 2)})
    json_data = json.dumps(list_data)

    return json_data