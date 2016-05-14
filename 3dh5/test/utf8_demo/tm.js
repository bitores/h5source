



EMeshParse = function(str){
	this.eMeshString = "";
	this.offset = 0;
};

EMeshParse.prototype = {
	constructor: EMeshParse,

	loadUTF8:function(url,onload){
		var scop = this;
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		 
		// Hack to pass bytes through unprocessed.
		req.overrideMimeType('text/plain; charset=x-user-defined');
		 
		req.onreadystatechange = function(e) {
		   if(this.readyState == 4 && this.status == 200) {
		   		scop.exportPodMesh(this.responseText);
		    	onload();
		    }
		};

		req.send();
	},
	Read16: function(str){
		if(str.length < (1 + this.offset))
			return undefined;
		var	flag1 = str.charCodeAt(this.offset++) & 0xff,
			flag2 = str.charCodeAt(this.offset++) & 0xff;

		var ret = flag2 << 8 | flag1;
		return ret;
	},
	Read16Array: function(str,len){
		var ret =[];
		var i16 = 0;
		for(var i=0; i<len; i++)
		{
			var i16 = this.Read16(str);
			if(i16 === undefined)
				return undefined;
			ret.push(i16);
		}

		return ret;
	},
	Read32: function(str){
		if(str.length < (3 + this.offset))
			return undefined;
		var	flag1 = str.charCodeAt(this.offset++) & 0xff,
			flag2 = str.charCodeAt(this.offset++) & 0xff,
			flag3 = str.charCodeAt(this.offset++) & 0xff,
			flag4 = str.charCodeAt(this.offset++) & 0xff;

		var ret = flag4 << 24 | flag3 << 16 | flag2 << 8 | flag1;
		return ret;
	},
	ReadName:function(str){
		return this.Read32(str);
	},
	ReadLen:function(str){
		return this.Read32(str);
	},
	ReadMark:function(str,ret){//nName,nLen
		var nName,nLen;
		if((nName = this.ReadName(str))===undefined){
			return false;
		}
		if((nLen = this.ReadLen(str))===undefined){
			return false;
		}
		ret.nName = nName;
		ret.nLen = nLen;
		console.log(ret);

		return true;
	},
	ReadMeshName:function(str,len){
		var content = "",code;
		if(len<=0 || str.length < this.offset + len) 
			return "";
		for(var i=0; i<len; i++)
		{
            code = str.charAt(this.offset++);
            content += code;
		}

		return content;
	},
	ReadNumbers:function(str,len,ret){
		var content = "",code;
		if(len<=0 || str.length < this.offset + len) 
			return false;
		for(var i=0; i<len; i++)
		{
            code = str.charAt(this.offset++);
            content += code;
		}

		var tmp = content.split(" ");
		ret = [];
		for(var i=0; i<tmp.length; i++)
		{
			ret.push(parseFloat(tmp[i]));
		}
		console.log(ret);
		return true;
	},
	ReadMesh:function(str){
		var nName,nLen;
		var meshName ="";
		var ret = {};
		var box = {};
		var numVertex = -1;
		var numFaces = -1;
		var numUV = -1;
		var pIdx = [];
		while(this.ReadMark(str,ret)){

			nName = ret.nName;
			nLen = ret.nLen;
			switch(nName){
				case ePODFileMesh:{

				};break;
				case ePODFileMeshName:{
					
					if((meshName = this.ReadMeshName(str,nLen))==="")
						return false;
					console.log("ePODFileMeshName:",meshName);
				};break;
				case ePODFileMeshBounds:{
					this.ReadNumbers(str,nLen,box);

				};break;
				case ePODFileMeshNumVtx:{
					numVertex = this.Read32(str);
					console.log("numVertex:",numVertex);
				};break;
				case ePODFileMeshNumFaces:{
					numFaces = this.Read32(str);
					console.log("numFaces:",numFaces);
				};break;
				case ePODFileMeshNumUVW:{
					numUV = this.Read32(str);
					console.log("numUV:",numUV);
				};break;
				case ePODFileMeshInterleaved:{
					if(numVertex < 0)
						return false;
				};break;
				case ePODFileMeshFaces:{
					if(numFaces < 0)
						return false;

				};break;
				// case ePODFileData:{
				// 	var tmp;
					// if((tmp = this.Read16Array(str,nLen/2))===undefined)
					// 	return false;
					// pIdx.concat(tmp);
				// };break;
				default:{
					flag = false;
					//skip();
					this.offset += nLen;
					// console.log("offset",this.offset);
				}
			}
		}	
	},
	exportPodMesh:function(str){
		var nName,nLen;
		var ret = {};
		while(this.ReadMark(str,ret)){
			nName = ret.nName;
			nLen = ret.nLen;
			console.log(nName);
			switch(nName){
				case ePODFileScene:;break;
				case ePODFileMesh:{
					console.log("ePODFileMesh");
					if(!this.ReadMesh(str)){
					}
				};break;
				default:{
					//skip
					// console.log(nName,"ePODFileMesh");
					this.offset += 8;
				}
			}
		}

		console.log("end..");
	}

};

//EPODFileName
var
ePODFileVersion				= 1000,
ePODFileScene				= 1001,
ePODFileExpOpt				= 1002,
ePODFileHistory				= 1003,
ePODFileEndiannessMisMatch  = -402456576,

ePODFileColourBackground	= 2000,
ePODFileColourAmbient	    = 2001,
ePODFileNumCamera       	= 2002,
ePODFileNumLight        	= 2003,
ePODFileNumMesh         	= 2004,
ePODFileNumNode         	= 2005,
ePODFileNumMeshNode         = 2006,
ePODFileNumTexture         	= 2007,
ePODFileNumMaterial         = 2008,
ePODFileNumFrame         	= 2009,
ePODFileCamera         		= 2010,		// Will come multiple times
ePODFileLight         		= 2011,		// Will come multiple times
ePODFileMesh         		= 2012,		// Will come multiple times
ePODFileNode         		= 2013,		// Will come multiple times
ePODFileTexture         	= 2014,	// Will come multiple times
ePODFileMaterial         	= 2015,	// Will come multiple times
ePODFileFlags         		= 2016,
ePODFileFPS         		= 2017,
ePODFileUserData         	= 2018,

ePODFileMatName							= 3000,
ePODFileMatIdxTexDiffuse				= 3001,
ePODFileMatOpacity						= 3002,
ePODFileMatAmbient						= 3003,
ePODFileMatDiffuse						= 3004,
ePODFileMatSpecular						= 3005,
ePODFileMatShininess					= 3006,
ePODFileMatEffectFile					= 3007,
ePODFileMatEffectName					= 3008,
ePODFileMatIdxTexAmbient				= 3009,
ePODFileMatIdxTexSpecularColour			= 3010,
ePODFileMatIdxTexSpecularLevel			= 3011,
ePODFileMatIdxTexBump					= 3012,
ePODFileMatIdxTexEmissive				= 3013,
ePODFileMatIdxTexGlossiness				= 3014,
ePODFileMatIdxTexOpacity				= 3015,
ePODFileMatIdxTexReflection				= 3016,
ePODFileMatIdxTexRefraction				= 3017,
ePODFileMatBlendSrcRGB					= 3018,
ePODFileMatBlendSrcA					= 3019,
ePODFileMatBlendDstRGB					= 3020,
ePODFileMatBlendDstA					= 3021,
ePODFileMatBlendOpRGB					= 3022,
ePODFileMatBlendOpA						= 3023,
ePODFileMatBlendColour					= 3024,
ePODFileMatBlendFactor					= 3025,
ePODFileMatFlags						= 3026,
ePODFileMatUserData						= 3027,

ePODFileTexName							= 4000,

ePODFileNodeIdx							= 5000,
ePODFileNodeName						= 5001,
ePODFileNodeIdxMat						= 5002,
ePODFileNodeIdxParent					= 5003,
ePODFileNodePos							= 5004,
ePODFileNodeRot							= 5005,
ePODFileNodeScale						= 5006,
ePODFileNodeAnimPos						= 5007,
ePODFileNodeAnimRot						= 5008,
ePODFileNodeAnimScale					= 5009,
ePODFileNodeMatrix						= 5010,
ePODFileNodeAnimMatrix					= 5011,
ePODFileNodeAnimFlags					= 5012,
ePODFileNodeAnimPosIdx					= 5013,
ePODFileNodeAnimRotIdx					= 5014,
ePODFileNodeAnimScaleIdx				= 5015,
ePODFileNodeAnimMatrixIdx				= 5016,
ePODFileNodeUserData					= 5017,

ePODFileMeshNumVtx						= 6000,
ePODFileMeshNumFaces					= 6001,
ePODFileMeshNumUVW						= 6002,
ePODFileMeshFaces						= 6003,
ePODFileMeshStripLength					= 6004,
ePODFileMeshNumStrips					= 6005,
ePODFileMeshVtx							= 6006,
ePODFileMeshNor							= 6007,
ePODFileMeshTan							= 6008,
ePODFileMeshBin							= 6009,
ePODFileMeshUVW							= 6010,			// Will come multiple times
ePODFileMeshVtxCol						= 6011,
ePODFileMeshBoneIdx						= 6012,
ePODFileMeshBoneWeight					= 6013,
ePODFileMeshInterleaved					= 6014,
ePODFileMeshBoneBatches					= 6015,
ePODFileMeshBoneBatchBoneCnts			= 6016,
ePODFileMeshBoneBatchOffsets			= 6017,
ePODFileMeshBoneBatchBoneMax			= 6018,
ePODFileMeshBoneBatchCnt				= 6019,
ePODFileMeshUnpackMatrix				= 6020,
ePODFileMeshName						= 6021,
ePODFileMeshBounds						= 6022,

ePODFileLightIdxTgt						= 7000,
ePODFileLightColour						= 7001,
ePODFileLightType						= 7002,
ePODFileLightConstantAttenuation		= 7003,
ePODFileLightLinearAttenuation			= 7004,
ePODFileLightQuadraticAttenuation		= 7005,
ePODFileLightFalloffAngle				= 7006,
ePODFileLightFalloffExponent			= 7007,

ePODFileCamIdxTgt			= 8000,
ePODFileCamFOV				= 8001,
ePODFileCamFar				= 8002,
ePODFileCamNear				= 8003,
ePODFileCamAnimFOV			= 8004,

ePODFileDataType			= 9000,
ePODFileN					= 9001,
ePODFileStride				= 9002,
ePODFileData				= 9003,

ePODFileKeyFrame      		=10000,
ePODFileKeyFrameNum     	=10001,
ePODFileKeyFrameName     	=10002,
ePODFileKeyFrameData      	=10003;

bool CSourceStream::Read(void* lpBuffer, const unsigned int dwNumberOfBytesToRead)
{
	_ASSERT(lpBuffer);
	_ASSERT(m_pFile);

	if (m_BytesReadCount + dwNumberOfBytesToRead > bufferSize) return false;

	memcpy(lpBuffer, &((char*) m_pFile)[m_BytesReadCount], dwNumberOfBytesToRead);

	m_BytesReadCount += dwNumberOfBytesToRead;
	return true;
}