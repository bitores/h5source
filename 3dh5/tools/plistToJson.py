# -*- coding: utf-8 -*-
import sys
import os
import xml.etree.ElementTree as ET
import json
import string

'''
    在python中，解析XML文件有很多中方法
    本文中要使用的方法是：xml.etree.ElementTree       
'''
#global var
#show log
SHOW_LOG = False
#XML file
XML_PATH = None

def get_root(path):
    '''parse the XML file,and get the tree of the XML file
    finally,return the root element of the tree.
    if the XML file dose not exist,then print the information'''
    if os.path.exists(path):
        if SHOW_LOG:
            print('start to parse the file : [{}]'.format(path))
        tree = ET.parse(path)
        return tree.getroot()
    else:
        print('the path [{}] dose not exist!'.format(path))

def get_element_tag(element):
    '''return the element tag if the element is not None.'''
    if element is not None:
        if SHOW_LOG:
            print('begin to handle the element : [{}]'.format(element))
        return element.tag
    else:
        print('the element is None!')

def get_element_attrib(element):
    '''return the element attrib if the element is not None.'''
    if element is not None:
        if SHOW_LOG:
            print('begin to handle the element : [{}]'.format(element))
        return element.attrib
    else:
        print('the element is None!')

def get_element_text(element):
    '''return the text of the element.'''
    if element is not None:
        return element.text
    else:
        print('the element is None!')

def get_element_children(element):
    '''return the element children if the element is not None.'''
    if element is not None:
        if SHOW_LOG:
            print('begin to handle the element : [{}]'.format(element))
        return [c for c in element]
    else:
        print('the element is None!')

def get_elements_tag(elements):
    '''return the list of tags of element's tag'''
    if elements is not None:
        tags = []
        for e in elements:
            tags.append(e.tag)
        return tags
    else:
        print('the elements is None!')

def get_elements_attrib(elements):
    '''return the list of attribs of element's attrib'''
    if elements is not None:
        attribs = []
        for a in elements:
            attribs.append(a.attrib)
        return attribs
    else:
        print('the elements is None!')

def get_elements_text(elements):
    '''return the dict of element'''
    if elements is not None:
        text = []
        for t in elements:
            text.append(t.text)
        return dict(zip(get_elements_tag(elements), text))
    else:
        print('the elements is None!')


def test():
	print "This is a test function"


# {{x,x},{x,x}} -> [x,x,x,x]
def get_rect(str):
	start = str.find("{{")
	middle = str.find("},{")
	end = str.find("}}");
	str = str[start+2:middle]+","+str[middle+3:end]
	return [int(c) for c in str.split(",")]

def get_size(str):
	start = str.find("{")
	middle = str.find(",")
	end = str.find("}")
	str = str[start+1:end]

	return [int(c) for c in str.split(",")];

def plistToJson(path,outfile):
	plistRoot = {}
	texture = {}
	images = []

	root = get_root(path)
	root_tag = get_element_tag(root)
	print root_tag
	children = get_element_children(root)
	print get_element_tag(children[0])
	children = get_element_children(children[0])

	# 图片列表
	metadata = children[2]
	print get_element_text(metadata)
	imgInfo = children[3]
	InfoArray = get_element_children(imgInfo)
	for child in InfoArray:
		tag = get_element_tag(child)
		if "key" != tag:
			continue;
		print "--"*20
		key = InfoArray.index(child)
		value =  get_element_text(InfoArray[key+1])
		name = get_element_text(child)
		if  "realTextureFileName" == name:
			texture["realTextureFileName"] = value
			print name, value
		elif "size" == name :
			size = get_size(value)
			texture["width"] = size[0]
			texture["height"] = size[1]
			print name, size
		elif "format" == name :
			metadataFormat = int(value)
			print name, metadataFormat
		elif "textureFileName" == name:
			textureFileName = value
			print name,value



	frames = children[0]
	print get_element_text(frames)
	imglist = children[1]
	imgArray = get_element_children(imglist)

	for child in imgArray:
		tag = get_element_tag(child)
		if "key" != tag:
			continue;
		imgObj = {};
		key = imgArray.index(child)
		value = imgArray[key+1]
		name = get_element_text(child)
		imgObj["name"] = name
		print '*'*20
		print name
		dictImg = get_element_children(value)
		for img in dictImg :
			tag0 = get_element_tag(img)
			if "key" != tag0:
				continue;
			key = dictImg.index(img)
			value = get_element_text(dictImg[key+1])
			name = get_element_text(img)
			if "frame" == name:
				rect = get_rect(value)
				a = float(rect[0] )/ texture["width"]
				b = float(rect[1] )/ texture["height"]
				c = float(rect[2] + rect[0])/ texture["width"]
				d = float(rect[3] + rect[1])/ texture["height"]
				imgObj[name] = [a,b,c,b,c,d,a,d]
				print name,imgObj[name]
			elif "sourceColorRect" == name:
				
				imgObj[name] = get_rect(value)
				print name,imgObj[name]
			elif "sourceSize" == name:
				
				imgObj[name] = get_size(value)
				print name,imgObj[name]
			elif "offset" == name:
				
				imgObj[name] = get_size(value)
				print name,imgObj[name]
			elif "rotated" == name:
				imgObj[name] = bool(get_element_tag(dictImg[key+1]) == "true")
				print name,imgObj[name]
			else:
				print name,":" ,value
		images.append(imgObj)
	plistRoot["texture"] = texture
	plistRoot["images"] = images


	f = open(outfile,'w')

	json.dump(plistRoot,f)
	f.close()

	return plistRoot


# if __name__ == '__main__':
    # test()

if len(sys.argv) == 1:
	fileabsolutepath = "test.plist"
else:
    fileabsolutepath = sys.argv[1]

basename = os.path.basename(fileabsolutepath)
print basename
sPath = basename.split('.')
print sPath
filename = sPath[0]

filename = filename + ".json"
if os.path.exists(filename):
	print "ok,the btx.json file exists."
else:
	print "create a new the btx.json file."




print plistToJson(basename,filename)



# {
# 	"texture":{
# 		"realTextureFileName":
# 		"width":
# 		"height":
# 	},
# 	"images":[
# 		{
# 			"assetname":
# 			"uvs":
# 			"rotated":
# 			"trimmed":
# 			"origsize":
# 			"offset":
# 		},
# 		{
# 			"assetname":
# 			"uvs":
# 			"rotated":
# 			"trimmed":
# 			"origsize":
# 			"offset":
# 		}
# 	]
# }