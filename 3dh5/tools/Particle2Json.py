import sys
import os
import json
import string
import fnmatch
import glob

#
#  
#
#
#
#
#
#
#
#


#get filename
def parsepaticle(fileabsolutepath,fileSavedPath):
	basename = os.path.basename(fileabsolutepath)
	print basename
	sPath = basename.split('.')
	print sPath
	filename = sPath[0]

	#open file
	file_object = open(fileabsolutepath,"r")
	lines = file_object.readlines()

	root = None
	emitter = None
	affector = None
	particle_system = None
	paritcle = None

	pattr = {}
	eattr = {}
	aattr = {}

	#0:particle_system  on{
	#1:emitter          on{
	#2:affector         on{
	#3:particle_system  off}
	#4:emitter          off}
	#5:affector         off}
	state=-1

	for line in lines:
	   #print line
	    L = string.split(line)
	    if len(L)==0:
	        continue
	    elif len(L) == 1:
	        if L[0]=='{':
	            print L[0]

	        elif L[0]=='}':
	            print L[0]
	            if state == 1:
	                state = 4
	                emitter.append(eattr)
	                eattr = {}
	            elif state == 2:
	                state = 5
	                affector.append(aattr)
	                aattr = {}
	            elif state == 4 or state == 5:
	                state = 3
	                p = {}
	                p["@attributes"] = qattr
	                p["emitter"] = emitter
	                p["affector"] = affector
	                particle_system.append(p)
	    elif len(L) == 2:
	        
	        if L[0]=='emitter':
	            print 'state:',state
	            if emitter == None:
	                emitter = []
	            eattr = {}
	            eattr["@attributes"] = {}
	            eattr["@attributes"]['type'] = L[1]
	            state = 1
	        elif L[0]=='affector':
	            print 'state:',state
	            print L[0],' TYPE:',L[1]
	            if affector == None:
	                affector = []
	            aattr = {}
	            aattr["@attributes"] = {}
	            aattr["@attributes"]['type'] = L[1]
	            state = 2
	        elif L[0]=='particle_system':
	            print 'state:',state
	            print L[1]

	            if root == None:
	                root = {}
	                root['particle'] = {}
	                particle = root['particle']
	                particle['particle_system'] = []
	                particle_system = particle['particle_system']
	            
	            state = 0
	            qattr = {}
	            qattr['name'] = L[1]

	            emitter = []
	            affector = []
	            
	        else:
	            print L[0],':',L[1]
	            if state == 0:
                        qattr[L[0]] = L[1]
	            elif state == 1:
	                eattr["@attributes"][L[0]] = L[1]
	            elif state == 2:
	                aattr["@attributes"][L[0]] = L[1]
	    elif len(L) == 3:
	        if L[0]=='emitter':
	            print 'state:',state
	            print L[0],' TYPE:',L[1],'Name:',L[2]
	            if emitter == None:
	                emitter = []
	            eattr = {}
	            eattr["@attributes"] = {}
	            eattr["@attributes"]['type'] = L[1]
	            eattr["@attributes"]['name'] = L[2]
	            state = 1
	        elif L[0]=='affector':
	            print 'state:',state
	            print L[0],' TYPE:',L[1],'Name:',L[2]
	            if affector == None:
	                affector = []
	            aattr = {}
	            aattr["@attributes"] = {}
	            aattr["@attributes"]['type'] = L[1]
	            aattr["@attributes"]['name'] = L[2]
	            state = 2
	            attr['@attributes'] = {}
	        else:
                if state==0:
                b = L[1:]
                tp = ' '.join(map(str,b))
                qattr[L[0]] = tp
                print L[0],':',tp
	    elif len(L) == 4:
	        b = L[1:]
	        tp = ' '.join(map(str,b))
	        print L[0],':',tp
	        if state == 0:
	            qattr[L[0]] = tp
	        elif state == 1:
	             eattr["@attributes"][L[0]] = tp
	        elif state == 2:
	             aattr["@attributes"][L[0]] = tp

	    elif len(L) == 5:
	        b = L[1:]
	        tp = ' '.join(map(str,b))
	        print L[0],':',tp
	        if state == 0:
	            qattr[L[0]] = tp
	        elif state == 1:
	             eattr["@attributes"][L[0]] = tp
	        elif state == 2:
	             aattr["@attributes"][L[0]] = tp

	filename = filename +".particle.json"
	filename = os.path.join(fileSavedPath,filename)
	if os.path.exists(filename):
	    print 'OK, the particle.json file exists.'
	    newFileName = filename+".mine"
	    if os.path.exists(newFileName):
	    	os.remove(newFileName)
	    os.rename(filename,newFileName)
	    
	f = open(filename,'w')

	json.dump(root,f)
	f.close()

	print "\nsuccess"
	file_object.close()
	os.remove(fileabsolutepath)


def GetFileFromThisRootDir(dir,ext):
    allfiles = []
    needExtFilter = (ext != None)
    for root,dirs,files in os.walk(dir):
        for filespath in files:
            filepath = os.path.join(root, filespath)
            extension = os.path.splitext(filepath)[1][1:]
            if needExtFilter and extension in ext:
                allfiles.append(filepath)
            elif not needExtFilter:
                allfiles.append(filepath)
    return allfiles

def particleToJson(particleDirPath):
	particleFiles = GetFileFromThisRootDir(particleDirPath, ".particle")
	for particleItem in particleFiles:
		filePath = os.path.dirname(particleItem)
		print filePath
		print particleItem
		parsepaticle(particleItem,filePath)


if __name__ == "__main__":
	particleToJson(sys.argv[1])
	raw_input()
