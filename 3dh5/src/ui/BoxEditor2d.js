e3d.EditorState = {"OFF":0, "ON":1, "EDIT":2};

var BoxEditor2d = function(root, name, closeBtnTexture, editBtnTexture, groupId){
	closeBtnTexture = closeBtnTexture || "";
	editBtnTexture = editBtnTexture || "";
	groupId = groupId || "";

	GameObject.call(this, root, name, groupId);
	
	this._width = 100;
	this._height = 100;
	this._scaleWidth = 1.0;		// transform (scale)
	this._scaleHeight = 1.0;	// transform (scale)
	this._minWith = 10;
	this._minHeight = 10;

	this._closeBtnSize = 0.0;
	this._editBtnSize = 0.0;
	this._borderWidthRatio = 0.02;
	this._fixBorderWidth = 0.0;
	this._fixBtnRadius = 0.0;

	this._bBtnResizable = true;
	this._bEditable = true;
	this._bCloseable = false;
	this._bMovable = true;
	this._state = e3d.EditorState.OFF;

	// moving event relevant
	this._isTouchDown = false;
	this._touchDownPos = new Vector3(0.0, 0.0, 0.0);
	this._touchDownOffset = new Vector3(0.0, 0.0, 0.0);

	// edit relevant
	this._ratio = 0.0;
	this._initRadian = 0;	// arctan(_ratio)
	this._initScaleWidth = 1.0;
	this._initScaleHeight = 1.0;
	this._initDerivedScaleWidth = 1.0;
	this._initDerivedScaleHeight = 1.0;		// ?


	// content previouse state
	this._anchorOffset = new Vector2(0.0, 0.0);


	// 1. eRect
	// clost btn rect
	this._closeBtnRect = new Mesh();
    var manipulator = new eRectManipulator(root, this._closeBtnRect);
    this._closeBtnRect.mManipulator = manipulator;
    manipulator.name = name + "_closeBtnRect";
	manipulator.mAnchor = CENTER;
    manipulator.updateVertices();
    root.mMeshMap[manipulator.name] = this._closeBtnRect; 
    // edit btn rect
    this._editBtnRect = new Mesh();
    var manipulator = new eRectManipulator(root, this._editBtnRect);
    this._editBtnRect.mManipulator = manipulator;
    manipulator.name = name + "_editBtnRect";
	manipulator.mAnchor = CENTER;
    manipulator.updateVertices();
    root.mMeshMap[manipulator.name] = this._editBtnRect; 
    // left border rect
    this._leftBorderRect = new Mesh();
    var manipulator = new eRectManipulator(root, this._leftBorderRect);
    this._leftBorderRect.mManipulator = manipulator;
    manipulator.name = name + "_leftBorderRect";
	manipulator.mAnchor = CENTER;
    manipulator.updateVertices();
    root.mMeshMap[manipulator.name] = this._leftBorderRect; 
    // right border rect
    this._rightBorderRect = new Mesh();
    var manipulator = new eRectManipulator(root, this._rightBorderRect);
    this._rightBorderRect.mManipulator = manipulator;
    manipulator.name = name + "_rightBorderRect";
	manipulator.mAnchor = CENTER;
    manipulator.updateVertices();
    root.mMeshMap[manipulator.name] = this._rightBorderRect; 
    // top border rect
    this._topBorderRect = new Mesh();
    var manipulator = new eRectManipulator(root, this._topBorderRect);
    this._topBorderRect.mManipulator = manipulator;
    manipulator.name = name + "_topBorderRect";
	manipulator.mAnchor = CENTER;
    manipulator.updateVertices();
    root.mMeshMap[manipulator.name] = this._topBorderRect;
    // bottom border rect
    this._bottomBorderRect = new Mesh();
    var manipulator = new eRectManipulator(root, this._bottomBorderRect);
    this._bottomBorderRect.mManipulator = manipulator;
    manipulator.name = name + "_bottomBorderRect";
	manipulator.mAnchor = CENTER;
    manipulator.updateVertices();
    root.mMeshMap[manipulator.name] = this._topBorderRect; 

    // 2. GameObject
    this.setTag(BoxEditor2d.TAG);
    this._contentContainer = new GameObject(root, name + "_contentContainer", this.getGroupID());
    this._content = null;
	this._closeBtn = new GameObject(root, name + "_closeBtn", this.getGroupID());
	this._closeBtn.setTag(BoxEditor2d.TAG);
	if (!this._bCloseable) { this._closeBtn.setVisible(false)};
	this._editBtn = new GameObject(root, name + "_editBtn", this.getGroupID());
	this._editBtn.setTag(BoxEditor2d.TAG);
	this._leftBottomGo = new GameObject(root, name + "_leftBottomGo", this.getGroupID());
	this._rightTopGo = new GameObject(root, name + "_rightTopGo", this.getGroupID());
	this._leftBorder = new GameObject(root, name + "_leftBorder", this.getGroupID());
	this._rightBorder = new GameObject(root, name + "_rightBorder", this.getGroupID());
	this._topBorder = new GameObject(root, name + "_topBorder", this.getGroupID());
	this._bottomBorder = new GameObject(root, name + "_bottomBorder", this.getGroupID());

	// 3. add mesh
	this._closeBtn.MeshFilter.mesh = name + "_closeBtnRect";
	this._editBtn.MeshFilter.mesh = name + "_editBtnRect";
	this._leftBorder.MeshFilter.mesh = name + "_leftBorderRect";
	this._rightBorder.MeshFilter.mesh = name + "_rightBorderRect";
	this._topBorder.MeshFilter.mesh = name + "_topBorderRect";
	this._bottomBorder.MeshFilter.mesh = name + "_bottomBorderRect";


	// 4. Material
	var matParameters = new MaterialAutoBuildParameters();
	matParameters.type = "surface";
	if (closeBtnTexture != "")
	{
		matParameters.color = "";
		matParameters.colorMap = closeBtnTexture;
	} else {
		matParameters.color = "0.2 0.2 0.2 1.0";
		matParameters.colorMap = "";
	}
	matParameters.depth_check = "false";
	matParameters.depth_write = "false";
	this._closeBtnMat = this.mRoot.getMaterialManager().buildMaterial(name + "_closeBtnMat", groupId, matParameters, ""); this._closeBtnMat.load();
	matParameters.type = "surface";
	if (editBtnTexture != "")
	{
		matParameters.color = "";
		matParameters.colorMap = editBtnTexture;
	} else {
		matParameters.color = "1.0 0.0 0.0 1.0";
		matParameters.colorMap = "";
	}
	matParameters.depth_check = "false";
	matParameters.depth_write = "false";
	this._editBtnMat = this.mRoot.getMaterialManager().buildMaterial(name + "_editBtnMat", groupId, matParameters, ""); this._editBtnMat.load();
	matParameters.type = "surface";
	matParameters.color = "1.0 1.0 1.0 1.0";
	matParameters.colorMap = "";
	matParameters.depth_check = "false";
	matParameters.depth_write = "false";
	this._leftBorderMat = this.mRoot.getMaterialManager().buildMaterial(name + "_leftBorderMat", groupId, matParameters, ""); this._leftBorderMat.load();
	this._rightBorderMat = this.mRoot.getMaterialManager().buildMaterial(name + "_rightBorderMat", groupId, matParameters, ""); this._rightBorderMat.load();
	this._topBorderMat = this.mRoot.getMaterialManager().buildMaterial(name + "_topBorderMat", groupId, matParameters, ""); this._topBorderMat.load();
	this._bottomBorderMat = this.mRoot.getMaterialManager().buildMaterial(name + "_bottomBorderMat", groupId, matParameters, ""); this._bottomBorderMat.load();

	// 5. add renderer
	this._closeBtn.Renderer.material = this._closeBtnMat;
	this._editBtn.Renderer.material = this._editBtnMat;
	this._leftBorder.Renderer.material = this._leftBorderMat;
	this._rightBorder.Renderer.material = this._rightBorderMat;
	this._topBorder.Renderer.material = this._topBorderMat;
	this._bottomBorder.Renderer.material = this._bottomBorderMat;

	// 6. add to parent game object
	this.addGameObject(this._contentContainer);
	this.addGameObject(this._leftBorder);
	this.addGameObject(this._rightBorder);
	this.addGameObject(this._topBorder);
	this.addGameObject(this._bottomBorder);
	this.addGameObject(this._closeBtn);
	this.addGameObject(this._editBtn);
	this.addGameObject(this._leftBottomGo);
	this.addGameObject(this._rightTopGo);
	
	this._update();

	this._showEditor(false);

	// temporarily, I fix the btn size
	this.fixBtnSize(0.07 * this.mRoot.getScreenWidth());
};

extend(BoxEditor2d, GameObject);

BoxEditor2d.TAG = 1;

BoxEditor2d.prototype._update = function(bForceResizeBtn) {
	if (bForceResizeBtn == null) 
		bForceResizeBtn = false;

	var derivedScale = this.getTransform()._getDerivedScale();
	var width = this._width * this._scaleWidth;
	var height = this._height * this._scaleHeight;

	this._closeBtn.getTransform().setPosition(-width * 0.5, -height * 0.5, 0.0);
	this._editBtn.getTransform().setPosition(width * 0.5, height * 0.5, 0.0);
	this._leftBottomGo.getTransform().setPosition(-width * 0.5, height * 0.5, 0.0);
	this._rightTopGo.getTransform().setPosition(width * 0.5, -height * 0.5, 0.0);
	this._leftBorder.getTransform().setPosition(-width * 0.5, 0.0, 0.0);
	this._rightBorder.getTransform().setPosition(width * 0.5, 0.0, 0.0);
	this._topBorder.getTransform().setPosition(0.0, -height * 0.5, 0.0);
	this._bottomBorder.getTransform().setPosition(0.0, height * 0.5, 0.0);

	if (this._bBtnResizable)
	{
		var borderWidthV = width * this._borderWidthRatio / derivedScale.x;
		var borderWidthH = width * this._borderWidthRatio / derivedScale.y;
		this._leftBorderRect.resize(borderWidthV, height + borderWidthH );
		this._rightBorderRect.resize(borderWidthV, height + borderWidthH);
		this._topBorderRect.resize(width + borderWidthV, borderWidthH);
		this._bottomBorderRect.resize(width + borderWidthV, borderWidthH);

		var radius = 0.1 * Math.sqrt(width * width + height * height);
		this._closeBtnSize = radius;
		this._editBtnSize = radius;
		this._closeBtnRect.resize(this._closeBtnSize / derivedScale.x, this._closeBtnSize / derivedScale.y);
		this._editBtnRect.resize(this._editBtnSize/ derivedScale.x, this._editBtnSize / derivedScale.y);
	} else {
		var borderLength = height + this._fixBorderWidth;
		this._leftBorderRect.resize(this._fixBorderWidth, borderLength );
		this._rightBorderRect.resize(this._fixBorderWidth, borderLength);
		borderLength = width + this._fixBorderWidth;
		this._topBorderRect.resize(borderLength, this._fixBorderWidth);
		this._bottomBorderRect.resize(borderLength, this._fixBorderWidth);
	}

	if (bForceResizeBtn && !this._bBtnResizable)
	{
		this._closeBtnSize = this._fixBtnRadius;
		this._editBtnSize = this._fixBtnRadius;
		this._closeBtnRect.resize(this._closeBtnSize / derivedScale.x, this._closeBtnSize / derivedScale.y);
		this._editBtnRect.resize(this._editBtnSize/ derivedScale.x, this._editBtnSize / derivedScale.y);
	}

}

BoxEditor2d.prototype._setScale = function(scaleWidth, scaleHeight){
	if (scaleWidth > 0.0 && scaleHeight > 0.0){
		this._scaleWidth = scaleWidth;
		this._scaleHeight = scaleHeight;
		this._contentContainer.getTransform().setScale(this._scaleWidth, this._scaleHeight, 1.0);
	}
}

BoxEditor2d.prototype.attachToGameObject = function(go){
	if (this._content != null)
	{
		this.detachGameObject();
	}
	if (this._content != null)
	{
		return;
	}
	var parent = go.getParent();
	if (!parent)
	{
		return;
	}
	var mf = go.getMeshFilter();
	if (!mf)
	{
		return;
	}
	var rect = mf.getMesh();
	if (!rect)
	{
		return;
	}
	var parentSceneManger = go.getParentSceneManager();
	if (!parentSceneManger)
	{
		return;
	}
	this._assignParentSceneMgr(parentSceneManger);

	this._content = go;
	parent.removeGameObject(this._content);
	parent.addGameObject(this);
	this._contentContainer.addGameObject(this._content);
	var goTransform = this._content.getTransform();

	// swap scale
	var goScale = goTransform.getScale();
	this._initScaleWidth = goScale.x;
	this._initScaleHeight = goScale.y;
	this._initDerivedScaleWidth = goTransform._getDerivedScale().x;
	this._initDerivedScaleHeight = goTransform._getDerivedScale().y;
	this._setScale(goScale.x, goScale.y);
	goTransform.setScale(1.0, 1.0, 1.0);

	// swap position
	var goPos = goTransform.getPosition();
	var _anchor = rect.getAnchor();
	this._anchorOffset = new Vector2(_anchor.x - 0.5, _anchor.y - 0.5);

	var tmp = goTransform.getOrientation().multiply ( new Vector3(	-rect.getWidth() * this._scaleWidth * this._anchorOffset.x, 
																	-rect.getHeight() * this._scaleHeight * this._anchorOffset.y, 
																	0.0));
	this.getTransform().setPosition(goPos.add(tmp));
	goTransform.setPosition(rect.getWidth() * this._scaleWidth * this._anchorOffset.x, rect.getHeight() * this._scaleHeight * this._anchorOffset.y, 0.0);

	// swap rotation
	this.getTransform().setOrientation(goTransform.getOrientation());
	goTransform.resetOrientation();

	this.setSize(rect.getWidth(), rect.getHeight());

	//_state = ON;
	//_showEditor(true);
	this._update(true);
},

BoxEditor2d.prototype.getAttachedGameObject = function(){
	return this._content;
},

BoxEditor2d.prototype.detachGameObject = function(){
	if (this._content) {
		// swap position
		var rect = this._content.getMeshFilter().getMesh();
		var contentTransform = this._content.getTransform();
		var tmp = this.getTransform().getOrientation().multiply(new Vector3(rect.getWidth() * this._scaleWidth * this._anchorOffset.x, 
																			rect.getHeight() * this._scaleHeight * this._anchorOffset.y, 
																			0.0));
		contentTransform.setPosition(this.getTransform().getPosition().add(tmp) );

		// swap scale
		contentTransform.setScale(this._contentContainer.getTransform().getScale());

		// swap rotation
		contentTransform.setOrientation(this.getTransform().getOrientation());

		var parent = this.getParent();
		parent.removeGameObject(this);
		this._contentContainer.removeGameObject(this._content);
		parent.addGameObject(this._content);
		
		this._assignParentSceneMgr(null);

		// reset?
		this._content = null;


	}
},

BoxEditor2d.prototype._assignParentSceneMgr = function(sceneMgr) {
	this.setParentSceneManager(sceneMgr);
	this._contentContainer.setParentSceneManager(sceneMgr);
	this._leftBorder.setParentSceneManager(sceneMgr);
	this._rightBorder.setParentSceneManager(sceneMgr);
	this._topBorder.setParentSceneManager(sceneMgr);
	this._bottomBorder.setParentSceneManager(sceneMgr);
	this._closeBtn.setParentSceneManager(sceneMgr);
	this._editBtn.setParentSceneManager(sceneMgr);
	this._leftBottomGo.setParentSceneManager(sceneMgr);
	this._rightTopGo.setParentSceneManager(sceneMgr);
},

BoxEditor2d.prototype._showEditor = function(bShow){
	this._leftBorder.setVisible(bShow);
	this._rightBorder.setVisible(bShow);
	this._topBorder.setVisible(bShow);
	this._bottomBorder.setVisible(bShow);
	if (this._bCloseable) this._closeBtn.setVisible(bShow);
	this._editBtn.setVisible(bShow);
},

BoxEditor2d.prototype.fixBtnSize = function(radius)
{
	this._bBtnResizable = false;
	this._fixBtnRadius = radius;
	this._fixBorderWidth = 0.1 * radius;
},

BoxEditor2d.prototype.setSize = function(width, height){
	if (width < this._minWith || height < this._minHeight)
	{
		return;
	}

	this._width = width;
	this._height = height;
}

BoxEditor2d.prototype._isTouchCloseBox = function(x, y){
	if (!this._bCloseable) return false;
	var t = this._closeBtn.getTransform();
	var btnPos = t._getDerivedPosition();
	var distance = Math.sqrt(Math.sqr(x - btnPos.x) + Math.sqr(y - btnPos.y));
	//if (distance < (_scaleWidth * t->getScale().x + _scaleHeight * t->getScale().y) * _closeBtnSize / 4.0)
	if (distance < this._closeBtnSize / 2.0)
		return true;
	else
		return false;
}

BoxEditor2d.prototype._isTouchEditBox = function(x, y){
	var t = this._editBtn.getTransform();
	var btnPos = t._getDerivedPosition();
	var distance = Math.sqrt(Math.sqr(x - btnPos.x) + Math.sqr(y - btnPos.y));
	//if (distance < (_scaleWidth * t->getScale().x + _scaleHeight * t->getScale().y) * _editBtnSize / 4.0)
	if (distance < this._editBtnSize / 2.0)
		return true;
	else
		return false;
	
}

BoxEditor2d.prototype._isTouchWholeBox = function(x, y){
	var ltPos = this._closeBtn.getTransform()._getDerivedPosition();
	var lbPos = this._leftBottomGo.getTransform()._getDerivedPosition();
	var rbPos = this._editBtn.getTransform()._getDerivedPosition();
	var rtPos = this._rightTopGo.getTransform()._getDerivedPosition();
	var touchPos = new Vector3(x, y, 0.0);
	
	var l1 =ltPos.sub(lbPos);
	var l2 = touchPos.sub(lbPos);
	var l = l1.cross(l2);
	if (l.z < 0.0)
		return false;

	l1 = lbPos.sub(rbPos);
	l2 = touchPos.sub(rbPos);
	l = l1.cross(l2);
	if (l.z < 0.0)
		return false;

	l1 = rbPos.sub(rtPos);
	l2 = touchPos.sub(rtPos);
	l = l1.cross(l2);
	if (l.z < 0.0)
		return false;

	l1 = rtPos.sub(ltPos);
	l2 = touchPos.sub(ltPos);
	l = l1.cross(l2);
	if (l.z < 0.0)
		return false;

	return true;

}

BoxEditor2d.prototype.isInternalComponent = function(go){
	if (go == this._contentContainer || 
		go == this._closeBtn || 
		go == this._editBtn ||
		go == this._leftBottomGo ||
		go == this._rightTopGo ||
		go == this._leftBorder||
		go == this._rightBorder ||
		go == this._topBorder ||
		go == this._bottomBorder
		)
		return true;
	else 
		return false;
	
}

BoxEditor2d.prototype.OnTouchEvent = function(action, x, y){

	if (this._bEditable)
	{
		if (action == e3d.TOUCH_DOWN)
		{
			if (this._state == e3d.EditorState.ON && this._isTouchCloseBox(x, y))
			{
				// delete item
				var go = this._content;
				var groupID = go.getGroupID();

				this.detachGameObject();
				//go.getParentSceneManager().destroyGameObject(go);
				
//				this._notifyResPathRemoved(_getResPathByGroupID(groupID));
				// IMPORTANT! 
				// Here we remove the resource of whole group,
				// as we are temporarily hard to remove resource that is only relevant to this game object.
				// [TODO jin] delete relevant resources (material, shader)?
				this.mRoot.releaseResourceByGroupId(groupID);
				return;
			}

			var isTouchWholeBox = this._isTouchWholeBox(x, y);
			var isTouchEditBox = this._isTouchEditBox(x, y);

			if (isTouchWholeBox || isTouchEditBox){
				if (this._state == e3d.EditorState.OFF)
				{
					this._state = e3d.EditorState.ON;
					this._showEditor(true);
				} 				
				if (isTouchEditBox) {
					this._state = e3d.EditorState.EDIT;
					this._ratio = this._height / this._width;
					this._initRadian = Math.atan(this._ratio * this._initScaleHeight/ this._initScaleWidth);
					//_initRadian = Math::ATan(_ratio * _initDerivedScaleHeight/ _initDerivedScaleWidth);
				}
			} else {
				if (this._state != e3d.EditorState.OFF) {
					this._state = e3d.EditorState.OFF;
					this._showEditor(false);
				}
			}
		}

		if (this._state == e3d.EditorState.EDIT)
		{
			if (action == e3d.TOUCH_UP) { // up
				this._state = e3d.EditorState.ON;
			} else if (action == e3d.TOUCH_MOVE) { // move
				// resize
				var distance = this.getTransform()._getDerivedPosition().distance(new Vector3(x, y, 0.0));
				var ratio = this._ratio * this._initScaleHeight / this._initScaleWidth;
				var w = 2 * distance / Math.sqrt(1.0 + ratio * ratio);
				this._setScale(w / this._width, w * ratio / this._height);
				this._update();
				
				// rotate
				var curRadian;
				curRadian = (y >= this.getTransform()._getDerivedPosition().y ? 1 : -1) * Math.acos((x - this.getTransform()._getDerivedPosition().x) / distance);
				this.getTransform().resetOrientation();
				var parentRadian = this.getParent().getTransform()._getDerivedOrientation().getRoll().mRad;
				this.getTransform().roll(curRadian - this._initRadian - parentRadian, TS_LOCAL);	
				//this.getTransform().roll(curRadian - _initRadian, TS_WORLD);	
			}
		}
	}


	if (this._state != e3d.EditorState.EDIT && this._bMovable)
	{
		if (action == e3d.TOUCH_DOWN) { // down
			if (!this._isTouchDown)
			{
				if (this._isTouchWholeBox(x, y))
				{
					this._isTouchDown = true;
					this._touchDownPos = new Vector3(x, y, 0);
					this._touchDownOffset = this.getTransform()._getDerivedPosition().sub(this._touchDownPos);
				} 
			}
		} else if (action == e3d.TOUCH_UP)	{ // up
			if (this._isTouchDown)
			{
				this._isTouchDown = false;
			}
		} else if (action == e3d.TOUCH_MOVE) { // move
			if (this._isTouchDown)
			{
				var p = this.getParent();
				if (p)
				{
					this.getTransform()._setDerivedPosition(new Vector3(x, y, 0.0).add(this._touchDownOffset));
				} else {
					this.getTransform().setPosition(new Vector3(x, y, 0.0).add(this._touchDownOffset));
				}
			}
		}
	}
}

