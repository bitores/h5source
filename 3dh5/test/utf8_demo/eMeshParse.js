
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
	ReadFloat: function(str,len){
		var	flag1 = str.charCodeAt(this.offset++) & 0xff,
			flag2 = str.charCodeAt(this.offset++) & 0xff,
			flag3 = str.charCodeAt(this.offset++) & 0xff,
			flag4 = str.charCodeAt(this.offset++) & 0xff;
		var f1 = parseInt(flag1,10).toString(16),
			f2 = parseInt(flag2,10).toString(16),
			f3 = parseInt(flag3,10).toString(16),
			f4 = parseInt(flag4,10).toString(16);

			if(flag1<16)
				f1 = "0" + f1;
			if(flag2<16)
				f2 = "0" + f2;
			if(flag3<16)
				f3 = "0" + f3;
			if(flag4<16)
				f4 = "0" + f4;

		var ret0 = f4+f3+f2+f1;//转化后的十六进制

		var ret1 = ret0.split("");
		// console.log(ret0,ret1);

		function checkBit(c){
			var L0 = parseInt(c,16).toString(10),
				L1 = parseInt(c,16).toString(2);

			if(L0<2)
				L1 = "000" + L1;
			else if(L0<4)
				L1 = "00" + L1;
			else if(L0<8)
				L1 = "0" + L1;
			else
				L1 = ""+L1;
			return L1;
		}

		for(var i=0; i<ret1.length; i++){
			ret1[i] = checkBit(ret1[i]);
		}

		var ret2 = ret1.join("");
		// console.log(ret2); //转化后的二进制
		
		function decimal(str){//.110计算小数部分
//小数点右边的 .100… 表示为 (1 × 2^-1) + (0 × 2^-2) + (0 × 2^-3) + ... ，其结果为.5 
    		var sp = str.split("");	
    		var sum = 0;
    		for(var i=0; i<sp.length; i++)
    		{
    			var l = parseInt(sp[i]);
    			sum += l * Math.pow(2,-i-1);
    		}
    		// console.log("sum:",sum);
    		return sum;
        }

        function turn(str){
     //   	S EEEEEEEE  FFFFFFFFFFFFFFFFFFFFFFFF
	 //		1     8                  23                
     //符号位   指数数位              尾数

        	var S = str[0] == "1"?-1:1,//1、符号
        	    eNumber = str.substr(1,8),//2、指数
        		E = parseInt(eNumber,2).toString(10),
        		fNumber = str.substr(9,23);//3、尾数
        	var F = decimal(fNumber);

        	var V;

        	if(E==255){
        		if(F==0){
        			if(S==-1){
        				V = -Infinity;
        			}else if(S==1){
        				V = Infinity;
        			}
        		}else{
        			V = NaN;
        		}
        	}else if(E>0&&E<255){
        		V = S * Math.pow(2,(E - 127)) * (1.0 + F);
        	}else if(E==0){
        		if(F==0){
        			if(S==-1){
        				V = -0;
        			}else if(S==1){
        				V = 0;
        			}
        		}else{
        			V = S * Math.pow(2,-126) * (0.0 + F);
        		}
        	}

        	return V;
        }

        // console.log(turn(ret2));

		var ret = turn(ret2);

		return ret;
	},
	Read16: function(str){
		if(str.length < (1 + this.offset))
			return undefined;
		var	flag1 = str.charCodeAt(this.offset++) & 0xff,
			flag2 = str.charCodeAt(this.offset++) & 0xff;

		var ret = flag2 << 8 | flag1;
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
		var vertexElement = [];
		var index = [];
		var numFaces = -1;
		var numUV = -1;
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
					if(numVertex<0) 
						return false;
					var tmp;
					vertexElement = [];
					for(var i=0; i<nLen/4; i++)
					{
						tmp = this.ReadFloat(str);
						if(tmp === undefined)
							return false;
						parseFloat(tmp,16);
						vertexElement.push(parseFloat(tmp,16));

					}
					// vertexElement = this.Read(str,nLen);
					console.log("offset:",this.offset);
					console.log(vertexElement);
				};break;
				case ePODFileMeshFaces:{
					if(numFaces < 0)
						return false;
					// var times = 0;
					// 	index = [];
					// while(this.ReadMark(str,ret)&&times<8){
					// 	nName = ret.nName;
					// 	nLen = ret.nLen;
					// 	times++;

					// 	switch(nName){
					// 		case ePODFileData:{
					// 			var ind;
					// 			// var index = [];
					// 			for(var i=0; i<nLen/2; i++){
					// 				ind = this.Read16(str);
					// 				index.push(ind);
					// 			}
					// 			console.log(index);
					// 			// return index;
					// 		};break;
					// 		default:{
					// 			this.offset += nLen;
					// 		}
					// 	}
					// }
					
				};break;
				case ePODFileData:{
					var ind;
						index = [];
					for(var i=0; i<nLen/2; i++){
						ind = this.Read16(str);
						index.push(ind);
					}
					console.log(index);
					// return index;
				};break;
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