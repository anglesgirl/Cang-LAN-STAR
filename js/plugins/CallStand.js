/*---------------------------------------------------------------------------*
 * 2020/01/7 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 立ち絵表示プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallStand 立ち絵IDor立ち絵エロ名 アニメX アニメY //衣装指定とかもできると〇
 * 
 * 戦闘エロのメモ
 * v[351] = 口を塞いでいる相手のID
 * v[352] = 前の以下略
 * v[353] = 後ろの以下略
 * v[415] = 拘束相手
 * 
 * 種族[1,human][2,tentacle][3,demon][4,worm?]
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallStand' || command === 'CallStandForce') {
      if (args[0].match(/\\v/)) {
        //args[1]に\vを含む場合の処理
        array = args[0].match(/[0-9]+\.?[0-9]*/g);
        for(var i = 0; i < array.length; i++) {
        args[0] = Number(array);
        var StandPoseID = $gameVariables.value(args[0]);
          }
        }else{var StandPoseID = args[0]
          }
      if(args[1] != null){var StandAnimeX = Number(args[1])}else{var StandAnimeX = 0};//アニメーション座標X
      if(args[2] != null){var StandAnimeY = Number(args[2])}else{var StandAnimeY = 0};//アニメーション座標Y
      if(args[3] != null){var StandAnimeWait = Number(args[3])}else{var StandAnimeWait = 1};//アニメーションウェイト

	  //催眠开关
	  var hypnosis = 0
      //立ち絵基本座標
	  var origin = 0;
	  if($gameSwitches.value(180)){
		var Stand1X = 512
		var Stand1Y = 384
		var scale = 82
		origin = 1;
	  }else if($gameActors.actor(1).zoomIn){
		var Stand1X = 480
		var Stand1Y = 30
		var scale = 80
	  }else{
		var Stand1X = 380
		var Stand1Y = 0
		var scale = 100
	  }
      $gameVariables._data[902] = Stand1X
      $gameVariables._data[903] = Stand1Y
	  
	  if(StandPoseID == 11){//土下座
		for(var i = 110; i <= 150; i++){$gameScreen.erasePicture(i);}
		if($gameSwitches.value(131)){
			if($gameActors.actor(1).isStateAffected(95)) submitCloth = 12;
			else submitCloth = 11;
			$gameScreen.showPicture(111,'submit/2',0,Stand1X,Stand1Y,scale,scale,255,0);
		}else{
			submitCloth = 14;
			$gameScreen.showPicture(111,'submit/1',0,Stand1X,Stand1Y,scale,scale,255,0);
		}
		FileName = 'submit/' + submitCloth;
		$gameScreen.showPicture(112,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);
		this.wait(10);
		return;
	  }
	  
	  var user = $gameActors.actor(1);

      //立ち絵エロの指定コモン228
      var Dif1PicFileName = 0;
      var Dif2PicFileName = 0;
      if(StandPoseID == "0" || StandPoseID == 0 || StandPoseID == null){StandPoseID = 1}
      else if(StandPoseID >= 1){}
      else if(StandPoseID == "1" || StandPoseID == "2" || StandPoseID == "3" || StandPoseID == "4" || StandPoseID == "5" || StandPoseID == "6" || StandPoseID == "7" || StandPoseID == "8" || StandPoseID == "9" || StandPoseID == "10"){StandPoseID = Number(StandPoseID);}
      else if(StandPoseID == "拘束_触手"){StandPoseID = 4;$gameVariables._data[415] = 2}
      else if(StandPoseID == "拘束_人間"){StandPoseID = 4;$gameVariables._data[415] = 1}
      else if(StandPoseID == "拘束_触手壁"){StandPoseID = 4;$gameVariables._data[415] = 3}
      else if(StandPoseID == "拘束_ワーム"){StandPoseID = 4;$gameVariables._data[415] = 4}
      else if(StandPoseID == "拘束_怪魔"){StandPoseID = 4;$gameVariables._data[415] = 5}
      else if(StandPoseID == "拘束_鎖"){StandPoseID = 4;$gameVariables._data[415] = 10}
      else if(StandPoseID == "拘束_くすぐり"){StandPoseID = 4;$gameVariables._data[415] = 11}
	  else if(StandPoseID == "催眠_假想"){StandPoseID = 4;$gameVariables._data[415] = 15}
	  else if(StandPoseID == "催眠_涂抹"){StandPoseID = 4;$gameVariables._data[415] = 16}
	  else if(StandPoseID == "催眠_注射"){StandPoseID = 4;$gameVariables._data[415] = 17}
	  else if(StandPoseID == "催眠_快乐"){StandPoseID = 4;$gameVariables._data[415] = 18}

      else if(StandPoseID == "挿入前脚上げ_人間"){StandPoseID = 5;$gameVariables._data[354] = 1}//415は拘束351-は穴
      else if(StandPoseID == "セックス脚上げ_人間"){StandPoseID = 5;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "触手拘束脚上げ"){StandPoseID = 5;$gameVariables._data[415] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手イラマセックス"){StandPoseID = 5;$gameVariables._data[351] = 2;$gameVariables._data[352] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手イラマアナルセックス"){StandPoseID = 5;$gameVariables._data[351] = 2;$gameVariables._data[353] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手セックス"){StandPoseID = 5;$gameVariables._data[352] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手アナルセックス"){StandPoseID = 5;$gameVariables._data[353] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手両穴セックス"){StandPoseID = 5;$gameVariables._data[352] = 2;$gameVariables._data[353] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手三穴セックス"){StandPoseID = 5;$gameVariables._data[352] = 2;$gameVariables._data[353] = 2;$gameVariables._data[354] = 2}//415は拘束351-は穴

      else if(StandPoseID == "セックス後背位_人間"){StandPoseID = 6;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "アナルセックス後背位_人間"){StandPoseID = 6;$gameVariables._data[353] = 1}//415は拘束351-は穴
      
      else if(StandPoseID == "鎖セックス_人間"){StandPoseID = 7;$gameVariables._data[352] = 1;$gameVariables._data[415] = 10}//415は拘束351-は穴
      else if(StandPoseID == "鎖二穴セックス_人間"){StandPoseID = 7;$gameVariables._data[352] = 1;$gameVariables._data[353] = 1;$gameVariables._data[415] = 10}//415は拘束351-は穴
      else if(StandPoseID == "二穴セックス_人間"){StandPoseID = 7;$gameVariables._data[352] = 1;$gameVariables._data[353] = 1}//415は拘束351-は穴

      else if(StandPoseID == "セックス開脚_人間"){StandPoseID = 8;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "アナルセックス開脚_人間"){StandPoseID = 8;$gameVariables._data[353] = 1}//415は拘束351-は穴
      else if(StandPoseID == "イラマセックス開脚_人間"){StandPoseID = 8;$gameVariables._data[351] = 1;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "イラマアナルセックス開脚_人間"){StandPoseID = 8;$gameVariables._data[351] = 1;$gameVariables._data[353] = 1}//415は拘束351-は穴
      else if(StandPoseID == "催眠洗脳"){StandPoseID = 8;$gameVariables._data[415] = 8}//415は拘束351-は穴
      else if(StandPoseID == "触手椅子"){StandPoseID = 8;$gameVariables._data[415] = 9}//415は拘束351-は穴
      else if(StandPoseID == "触手椅子_両穴"){StandPoseID = 8;$gameVariables._data[415] = 9;$gameVariables._data[352] = 1;$gameVariables._data[353] = 1}//415は拘束351-は穴
	  else if(StandPoseID == "催眠开脚"){StandPoseID = 8;hypnosis = 1}

      else if(StandPoseID == "奉仕_人間"){StandPoseID = 9;$gameVariables._data[351] = 1}
      else if(StandPoseID == "奉仕_触手"){StandPoseID = 9;$gameVariables._data[351] = 2}
      else if(StandPoseID == "催眠奉仕_触手"){StandPoseID = 9;$gameVariables._data[351] = 2}
	  else if(StandPoseID == "催眠奉仕_人间"){StandPoseID = 9;$gameVariables._data[351] = 1;hypnosis = 1}
      else if(StandPoseID == "倒地"){StandPoseID = 10;}
      else if(StandPoseID == "倒地人间sex"){StandPoseID = 10;$gameVariables._data[352] = 1} 
      else{console.error('ポーズIDが不正'); StandPoseID = 1;}

      $gameVariables._data[915] = StandPoseID//ゲーム内変数に入れておく
      $gameVariables._data[916] = StandPoseID//ゲーム内変数に入れておく

      if(command == 'CallStandForce'){$gameVariables._data[912] = StandPoseID}
      else{$gameVariables._data[912] = 0}

      //ゲーム中の装備番号
      var StandEqCloth = 1
      var StandEqLeg = 7

      //フラグ
      if($gameSwitches.value(131)){
        var StandAltFlag = 1
      }else{
        var StandAltFlag = 0
      }

      //衣装耐久
      $gameVariables._data[741] = $gameVariables.value(702)
      $gameVariables._data[742] = $gameVariables.value(722)

      //状態の確認
      var LovejuiceFlag = 0
	  var SweatFlag = 0
	  var BreathFlag = 0
	  
	  if($gameVariables.value(1027) >= 100){
		  LovejuiceFlag = 1
		  SweatFlag = 1
		  BreathFlag = 1
	  }else{
		if($gameVariables.value(1027) >= 50)  LovejuiceFlag = 1 
	    if($gameVariables.value(1026) >= 500){
		 SweatFlag = 1
		 BreathFlag = 1
		}
	  }
	  
	  //状态
		var Mark1 = "0";
		var Mark2 = "0";
		var PaintIndex = "0";
		var ScarFlag = 0;
		//伤痕
		if(user.isStateAffected(320)) ScarFlag = 1;
		//淫纹
		if(user.isStateAffected(321)){
			if(user.mark) Mark1 = user.mark;
			else Mark1 = "6";
			if([6,7].includes(StandPoseID)) Mark1 = "0";}
		if(user.isStateAffected(322)) Mark2 = "10";
		//大淫纹
		if(user.isStateAffected(407)){
			Mark1 = "14";
		}
		//涂鸦
		if($gameVariables.value(4900) > 0){
			if($gameVariables.value(4900) <= 1){PaintIndex = "11"}
			else if($gameVariables.value(4900) <= 2){PaintIndex = "12"}
			else{PaintIndex = "13"}
		}
		
      //精液汚れ度
      var SemenBody = $gameVariables.value(942)
      var SemenFace = $gameVariables.value(941)
      var SemenAnus = $gameVariables.value(945)
      var SemenVagina = $gameVariables.value(944)
      var SemenMouth = $gameVariables.value(943)

      //呼び出しファイル名入力用
      var FileName = 0
	  
	  var PiercePicFileNum = 0;
	  var PierceL = -1;
	  var PierceR = -1;
      if($gameActors._data[1]._equips[10] && $gameActors._data[1]._equips[10]._itemId >= 5){
		 var m = $gameActors._data[1]._equips[10]._itemId;
         PiercePicFileNum = eval($dataArmors[m].meta.PID);
		 if($dataArmors[m].meta["CorrectL"] && $dataArmors[m].meta["CorrectR"]){
			PierceL = $dataArmors[m].meta.CorrectL[StandPoseID-1];
			PierceR = $dataArmors[m].meta.CorrectR[StandPoseID-1];
		 }
      }//PierceL大于0代表有超出身体
	  
	  var ClitPicFileNum = 0;
	  if($gameActors._data[1]._equips[14] && $gameActors._data[1]._equips[14]._itemId >= 5){
		 var m = $gameActors._data[1]._equips[14]._itemId;
         ClitPicFileNum = eval($dataArmors[m].meta.PID);
	  }

	  var [
	  stand_difback,
	  stand_base, //136、201、229
	  stand_vb,
	  stand_bb,
	  stand_pv,
	  stand_pvb,
	  stand_scar,
	  stand_paint,
	  stand_mark1,
	  stand_mark2,
	  stand_ero,
	  stand_sweat,
	  stand_semenhole,
	  stand_face,
	  stand_eye,
	  stand_mouth,
	  stand_hair,
	  stand_ear,
	  stand_clitRing,
	  stand_pierceL,
	  stand_pierceR,
	  stand_under,
	  stand_leg,
	  effect_splash,
	  stand_cloth, //乳环处理到此为止
	  stand_Lmark1,
	  stand_Lmark2,
	  stand_neck,
	  stand_byt,
	  stand_semenbody,
	  stand_semenface,
	  stand_semenmouth, //尾巴处理到此为止
	  effect_breath,
	  stand_diffront] = Array(34).fill(null).map((_,i) => i); //diffront在下面reset_ERO
	  
	  var stand_array = Array(34).fill(null).map((_,i) => i + 110);
	
	
      //装備情報取得
      
      var NippleL = 1;
	  var NippleR = 1;
      var ClothUpdate = 0
      if($gameActors._data[1]._equips[StandEqCloth]._itemId >= 5){
        
        var StandEqNum = $gameActors._data[1]._equips[StandEqCloth]._itemId//衣装指定する場合はここの処理変更
        var EqClothOpacity = $dataArmors[StandEqNum].meta.ClothOpacity
        if(user.isStateAffected(55) || user.addedSkills().contains(722) || user.isLearnedSkill(722)){
          EqClothOpacity = EqClothOpacity / 2
        }//すけすけステート食らっている場合
        if($gameVariables.value(4964) != EqClothOpacity){
          ClothUpdate = 1
        }else{ClothUpdate = 0}//透過度が違う場合保存して更新フラグオン
        $gameVariables._data[4964] = EqClothOpacity

		if(StandEqNum == 65 && user.isStateAffected(94)) StandEqNum = 61
		if(StandEqNum == 65 && user.isStateAffected(95)) StandEqNum = 62
		if(StandEqNum == 67 && user.isStateAffected(94)) StandEqNum = 68
        if(StandEqNum == 67 && user.isStateAffected(95)) StandEqNum = 69
        if(StandEqNum == 71 && user.isStateAffected(94)) StandEqNum = 72
        if(StandEqNum == 71 && user.isStateAffected(95)) StandEqNum = 73
		if(StandEqNum == 76 && user.isStateAffected(94)) StandEqNum = 63
        if(StandEqNum == 76 && user.isStateAffected(95)) StandEqNum = 64
        var UnderPicFlag = Number($dataArmors[StandEqNum].meta.ClothUnderFlag); //衣装の下着フラグ
        var ClothPicFileNum = $dataArmors[StandEqNum].meta.PID;
		//乳牛服装切换
		if(StandEqNum == 77 && $CM_runiu < 3) 
		{
			switch ($CM_runiu) {
				case 1:ClothPicFileNum = "48a";break;
				case 2:ClothPicFileNum = "48b";
			}
		}
		if(StandEqNum == 77 && $CM_runiu == 3) 
		{
			user.addState(423);
		}
		else
		{
			user.removeState(423);
		}
		if([65,61,62].includes(StandEqNum) && user.isStateAffected(88)) ClothPicFileNum += 'b';
		if(StandAltFlag < 1 && $dataArmors[StandEqNum].meta.AltDifference && $dataArmors[StandEqNum].meta.AltDifference[StandPoseID-1] > 0) ClothPicFileNum += 'b';
		NippleL = $dataArmors[StandEqNum].meta.ClothNippleL[StandPoseID-1];
		NippleR = $dataArmors[StandEqNum].meta.ClothNippleR[StandPoseID-1];
      }else{
        var EqClothOpacity = 255 //衣装透過度
        var UnderPicFlag = 1; //下着
        var ClothPicFileNum = 0
      }
      
      //変身衣装コス
      var Cosplay = 0
      if($gameActors._data[1]._equips[StandEqCloth]._itemId >= 5 && $dataArmors[StandEqNum].meta.Cosplay){//コス着てる場合
        var StandAltFlag = 1
        var Cosplay = 1
      }
	  //眼罩
	  var EyePicFileNum = 0;
      if($gameActors._data[1]._equips[9] && $gameActors._data[1]._equips[9]._itemId >= 5){
         EyePicFileNum = eval($dataArmors[$gameActors._data[1]._equips[9]._itemId].meta.PID);
      }
	  
	  //口球
	  var MouthPicFileNum = 0;
      if($gameActors._data[1]._equips[11] && $gameActors._data[1]._equips[11]._itemId >= 5){
         MouthPicFileNum = eval($dataArmors[$gameActors._data[1]._equips[11]._itemId].meta.PID);
      }
	  
	  var NeckPicFileNum = 0;
      if($gameActors._data[1]._equips[8] && $gameActors._data[1]._equips[8]._itemId >= 5){
         NeckPicFileNum = eval($dataArmors[$gameActors._data[1]._equips[8]._itemId].meta.PID);
      }//项圈

	  var EarPicFileNum = 0;
	  if($gameActors._data[1]._equips[13]) var eyeId = $gameActors._data[1]._equips[13]._itemId;
	  else var eyeId = 0;
      if(eyeId >= 5){
         EarPicFileNum = eval($dataArmors[eyeId].meta.PID);
		 //处理尾巴
		 if(StandPoseID == 6){
			stand_array.splice(stand_ear,0,...stand_array.splice(stand_cloth,1));
		 }
      }//耳朵

      //下着のオンオフ
	  var UnderPicFileNum = 0;
	  if($gameActors._data[1]._equips[12]){
		var k = $gameActors._data[1]._equips[12]._itemId;
		if(k == 87 || k == 284 || k == 286 ) UnderPicFlag = 1;//奶牛内衣与榨乳器显示
		if(k >= 5 && (UnderPicFlag >= 1 || $dataArmors[k].meta.ForceDisplay)){
		 UnderPicFileNum = eval($dataArmors[k].meta.PID);
		 if(StandAltFlag < 1 && $dataArmors[k].meta.AltDifference && $dataArmors[k].meta.AltDifference[StandPoseID-1] > 0) UnderPicFileNum += 'b';
		 if(NippleL == 1) NippleL = $dataArmors[k].meta.UnderNippleL[StandPoseID-1];
		 if(NippleR == 1) NippleR = $dataArmors[k].meta.UnderNippleR[StandPoseID-1];
		}
	  }
	  
	  //打开露出判定开关
	  $gameSwitches._data[2922] = NippleL >= 1 ? true : false;
	  $gameSwitches._data[2923] = NippleR >= 1 ? true : false;
	  
	  //处理吊坠
	  var PiercePicFileNumR = 0;
	  if(PierceR + PierceL >= 0){
		PiercePicFileNumR = PiercePicFileNum;
		PiercePicFileNum += 'l';
		PiercePicFileNumR += 'r';
		if(PierceL >= 1 && NippleL < 1) PiercePicFileNum += 'b';
		if(PierceR >= 1 && NippleR < 1) PiercePicFileNumR += 'b';
		if(NippleR >= 1){
			stand_array.splice(stand_pierceR,0,...stand_array.splice(stand_cloth,1));
		}
		if(NippleL >= 1){
			stand_array.splice(stand_pierceL,0,...stand_array.splice(stand_cloth,1));
		}
	  }

	  //大淫纹处理
	  if(user.isStateAffected(407)){stand_array.splice(stand_mark1,0,...stand_array.splice(stand_cloth,1));}
	  //心乳贴处理
	  var heartNipple = 0;
	  if(UnderPicFileNum == 8) heartNipple = 1;
	  [
	  stand_difback,
	  stand_base, //136、201、229
	  stand_vb,
	  stand_bb,
	  stand_pv,
	  stand_pvb,
	  stand_scar,
	  stand_paint,
	  stand_mark1,
	  stand_mark2,
	  stand_ero,
	  stand_sweat,
	  stand_semenhole,
	  stand_face,
	  stand_eye,
	  stand_mouth,
	  stand_hair,
	  stand_ear,
	  stand_clitRing,
	  stand_pierceL,
	  stand_pierceR,
	  stand_under,
	  stand_leg,
	  effect_splash,
	  stand_cloth, //乳环处理到此为止
	  stand_Lmark1,
	  stand_Lmark2,
	  stand_neck,
	  stand_byt,
	  stand_semenbody,
	  stand_semenface,
	  stand_semenmouth, //尾巴处理到此为止
	  effect_breath,
	  stand_diffront] = stand_array; //diffront在下面reset_ERO
	  
	  window.savePicIndex = {under:stand_under, socks:stand_leg, cloth:stand_cloth, ear:stand_ear};

      //足装備取得
	  var LegOpacity = 0;
      if($gameActors._data[1]._equips[StandEqLeg]._itemId >= 5){
        var LegEqNum = $gameActors._data[1]._equips[StandEqLeg]._itemId
        var LegPicFileNum = $dataArmors[LegEqNum].meta.PID
		LegOpacity = $dataArmors[LegEqNum].meta.LegOpacity;
      }else{
        var LegPicFileNum = 0};
		

      //立ち絵ポーズ基本ファイル名
      StandPoseID = ( '00' + StandPoseID ).slice( -2 );//ゼロ埋め
      var BasePoseFileName = 'actor01_pose'
	  var BasePose2FileName = 'actor04_pose'

      BasePoseFileName += StandPoseID//ポーズ名を結合
	  BasePose2FileName += StandPoseID//ポーズ名を結合

      //立ち絵素体//変身中か乳首見えてるかなど
	  var weaponIndex = '';
      if(StandAltFlag >= 1){
		  if($gameSwitches.value(98)) var BaseID = "0006";
          else{
			  var BaseID = "0004";
			  var id = $gameActors._data[1]._equips[0]._itemId
			  if(StandPoseID <= 2 && id >= 5){
				weaponIndex = $dataWeapons[id].meta.PID ? eval($dataWeapons[$gameActors._data[1]._equips[0]._itemId].meta.PID) : 1;
				if($dataWeapons[id].meta.feat){
					if(user.isStateAffected(392) || window.weaponEffect) weaponIndex += 'b';
				}
			  }
		  }
      }else{
          var BaseID = "0002";
      }
	  
	  //身体
	  if($gameSwitches.value(3001) == true)
	  {
		FileName = BasePose2FileName + "_body_" + BaseID
	  }
	  else
	  {
		FileName = BasePoseFileName + "_body_" + BaseID
	  }
      if($gameScreen.picture(stand_base) && $gameScreen.picture(stand_base)._name == FileName){
      }else{
        $gameScreen.showPicture(stand_base,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0)
      }
	  var bodyTone = [0,0,0,0];
	  if(user.isStateAffected(316)) bodyTone = [50,0,29,0];
      if($gameScreen.picture(stand_base) && bodyTone != $gameScreen.picture(stand_base)._tone) $gameScreen.picture(stand_base).tint(bodyTone, 0);
	  
	  //性器变黑
	  if(ConfigManager.noBlacken){$gameScreen.erasePicture(stand_vb); $gameScreen.erasePicture(stand_bb);}
	  else{
		FileName = 'organ/' + StandPoseID + 'v';
		if($gameScreen.picture(stand_vb) && $gameScreen.picture(stand_vb)._name == FileName){
		}else{
			$gameScreen.showPicture(stand_vb,FileName,origin,Stand1X,Stand1Y,scale,scale,((($gameVariables.value(1104)+$gameVariables.value(1106))*10+$gameVariables.value(1045))/2.5).clamp(0,160),0)
		}
		FileName = 'organ/' + StandPoseID + 'b';
		if($gameScreen.picture(stand_bb) && $gameScreen.picture(stand_bb)._name == FileName){
		}else{
			$gameScreen.showPicture(stand_bb,FileName,origin,Stand1X,Stand1Y,scale,scale,(($gameVariables.value(1103)+$gameVariables.value(1074))/20*255).clamp(0,255),0);
		}
	  }
		  
	  //头发
	  if(!$gameScreen.picture(stand_base) || $gameSwitches.value(98)) $gameScreen.erasePicture(stand_hair);
	  else{
		  if(StandAltFlag >= 1) FileName = 'hair/' + StandPoseID + '_2';
		  else FileName = 'hair/' + StandPoseID + '_1';
		  if($gameScreen.picture(stand_hair) && $gameScreen.picture(stand_hair)._name == FileName){}
		  else{
			var realPictureId = $gameScreen.realPictureId(stand_hair);
			var P = new Game_Picture();
			P.show(FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);
			if(StandAltFlag >= 1) P._tone = user.hairToneb;
			else P._tone = user.hairTone;
			$gameScreen._pictures[realPictureId] = P;
		  }
	  }
      //衣装
	  if(ClothPicFileNum != 0 && heartNipple ==0){
		FileName = BasePoseFileName + "_cloth_" + "00" + (ClothPicFileNum.replace(/\D/g, '').length > 1 ? "" : "0") + ClothPicFileNum
		if($gameScreen.picture(stand_cloth) && $gameScreen.picture(stand_cloth)._name == FileName && ClothUpdate == 0){
		}else{    
		  var realPictureId = $gameScreen.realPictureId(stand_cloth);
		  var P = new Game_Picture();
		  P.show(FileName,origin,Stand1X,Stand1Y,scale,scale,EqClothOpacity,0);
		  P._tone = $gameActors.actor(2).toneArray[$gameActors._data[1]._equips[1]._itemId];
		  $gameScreen._pictures[realPictureId] = P;
		}
	  }else{$gameScreen.erasePicture(stand_cloth)}
      //脚　変身中は反映なし
	  if(LegPicFileNum != 0 && (StandAltFlag == 0 || Cosplay == 1)){
		FileName = BasePoseFileName + "_option_" + "00" + (LegPicFileNum.replace(/\D/g, '').length > 1 ? "" : "0") + LegPicFileNum
		if($gameScreen.picture(stand_leg) && $gameScreen.picture(stand_leg)._name == FileName){
		}else{   
		  var realPictureId = $gameScreen.realPictureId(stand_leg);
		  var P = new Game_Picture();
		  P.show(FileName,origin,Stand1X,Stand1Y,scale,scale,LegOpacity,0);
		  P._tone = $gameActors.actor(2).toneArray[$gameActors._data[1]._equips[7]._itemId];
		  $gameScreen._pictures[realPictureId] = P;
        }
      }else{$gameScreen.erasePicture(stand_leg);}
      //下着
      FileName = 'under/' + StandPoseID + "_" + UnderPicFileNum
      if($gameScreen.picture(stand_under) && $gameScreen.picture(stand_under)._name == FileName){
      }else{
        if(UnderPicFileNum != 0){//取得した装備タグの衣装ファイル名が0(全裸)以外の場合  
		  var realPictureId = $gameScreen.realPictureId(stand_under);
		  var P = new Game_Picture();
		  P.show(FileName,origin,Stand1X,Stand1Y,scale,scale,240,0);
		  P._tone = $gameActors.actor(2).toneArray[$gameActors._data[1]._equips[12]._itemId];
		  $gameScreen._pictures[realPictureId] = P;
        }else{
          $gameScreen.erasePicture(stand_under)//全裸の場合消去
        }
      }
      //息
      FileName = BasePoseFileName + "_option_" + "0035"      
      if($gameScreen.picture(effect_breath) && $gameScreen.picture(effect_breath)._name == FileName){
      }else{
          if(BreathFlag >= 1){
            $gameSwitches._data[52] = true;//吐息アニメ    
            $gameScreen.showPicture(effect_breath,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);           
          }else{
            $gameSwitches._data[52] = false;//吐息アニメ
            $gameScreen.erasePicture(effect_breath);
          }
      }
      //表情    
      var FaceId = AutoFaceId(user);
	  if(FaceId == 0 || ['06','10'].includes(StandPoseID) || !$gameScreen.picture(stand_base)){
	     if($gameScreen.picture(stand_face)) $gameScreen.erasePicture(stand_face);
	  }else{
	     FaceId = ( '0000' + FaceId ).slice( -4 );//ゼロ埋め
         FileName = BasePoseFileName + "_face_" + FaceId;     
         if($gameScreen.picture(stand_face) && $gameScreen.picture(stand_face)._name == FileName){
		 }else{
			$gameScreen.showPicture(stand_face,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);
		 }
	  }
	  
	  //汗水+爱液
	  if(SweatFlag < 1 && LovejuiceFlag < 1){$gameScreen.erasePicture(stand_sweat);}
	  else{
		  if(SweatFlag >= 1 && LovejuiceFlag >= 1){var SweatPicFileNum = "0032"}
		  else if(SweatFlag >= 1 && LovejuiceFlag == 0){var SweatPicFileNum = "0036"}
		  else if(SweatFlag == 0 && LovejuiceFlag >= 1){var SweatPicFileNum = "0031"}
		  else{}
		  FileName = BasePoseFileName + "_option_" + SweatPicFileNum;
		  if($gameScreen.picture(stand_sweat) && $gameScreen.picture(stand_sweat)._name == FileName){}
		  else{$gameScreen.showPicture(stand_sweat,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //侵蚀
	  if(!ConfigManager.Erode){$gameScreen.erasePicture(stand_ero);}
	  else{
		  FileName = 'mark/' + StandPoseID + "_9";
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  var s = ($gameVariables.value(1030) - 45)*5;
		  if($gameScreen.picture(stand_ero) && $gameScreen.picture(stand_ero)._name == FileName && $gameScreen.picture(stand_ero)._opacity == s){}
		  else{$gameScreen.showPicture(stand_ero,FileName,origin,Stand1X,Stand1Y,scale,scale,s,0);}
	  }
	  //伤痕
	  if(ScarFlag < 1){$gameScreen.erasePicture(stand_scar);}
	  else{
		  FileName = 'mark/' + StandPoseID + "_8";
		  if($gameScreen.picture(stand_scar) && $gameScreen.picture(stand_scar)._name == FileName){}
		  else{$gameScreen.showPicture(stand_scar,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //涂鸦
	  if(PaintIndex == "0"){$gameScreen.erasePicture(stand_paint);}
	  else{
		  FileName = 'mark/' + StandPoseID + "_" + PaintIndex;
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  if($gameScreen.picture(stand_paint) && $gameScreen.picture(stand_paint)._name == FileName){}
		  else{$gameScreen.showPicture(stand_paint,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //淫紋
	  if(Mark1 == "0"){$gameScreen.erasePicture(stand_mark1);}
	  else{
		  FileName = 'mark/' + StandPoseID + "_" + Mark1;
		  if($gameScreen.picture(stand_mark1) && $gameScreen.picture(stand_mark1)._name == FileName){}
		  else{
			  $gameScreen.showPicture(stand_mark1,FileName,origin,Stand1X,Stand1Y,scale,scale,200,0);
			  $gameScreen.picture(stand_mark1)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
			  $gameScreen.showPicture(stand_Lmark1,FileName,origin,Stand1X,Stand1Y,scale,scale,66,0);
			  $gameScreen.picture(stand_Lmark1)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
		  }
	  }
	  if(Mark2 == "0"){$gameScreen.erasePicture(stand_mark2);}
	  else{
		  FileName = 'mark/' + StandPoseID + "_" + Mark2;
		  if($gameScreen.picture(stand_mark2) && $gameScreen.picture(stand_mark2)._name == FileName){}
		  else{
			  $gameScreen.showPicture(stand_mark2,FileName,origin,Stand1X,Stand1Y,scale,scale,200,0);
			  $gameScreen.picture(stand_mark2)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
			  $gameScreen.showPicture(stand_Lmark2,FileName,origin,Stand1X,Stand1Y,scale,scale,66,0);
			  $gameScreen.picture(stand_Lmark2)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
		  }
	  }
	  //眼罩
	  if(EyePicFileNum == 0 || $gameSwitches.value(98)){$gameScreen.erasePicture(stand_eye);}
	  else{
		  FileName = 'eye/' + StandPoseID + "_" + EyePicFileNum;
		  if($gameScreen.picture(stand_eye) && $gameScreen.picture(stand_eye)._name == FileName){}
		  else{$gameScreen.showPicture(stand_eye,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //口球
	  if(MouthPicFileNum == 0){$gameScreen.erasePicture(stand_mouth);}
	  else{
		  FileName = 'mouth/' + StandPoseID + "_" + MouthPicFileNum;
		  if($gameScreen.picture(stand_mouth) && $gameScreen.picture(stand_mouth)._name == FileName){}
		  else{$gameScreen.showPicture(stand_mouth,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	 
	  //项链
	  if(NeckPicFileNum == 0){$gameScreen.erasePicture(stand_neck);}
	  else{
		  FileName = 'neck/' + StandPoseID + "_" + NeckPicFileNum;
		  if($gameScreen.picture(stand_neck) && $gameScreen.picture(stand_neck)._name == FileName){}
		  else{$gameScreen.showPicture(stand_neck,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //耳朵
	  if(EarPicFileNum == 0){$gameScreen.erasePicture(stand_ear);}
	  else{
		  FileName = 'ear/' + StandPoseID + "_" + EarPicFileNum;
		  if($gameScreen.picture(stand_ear) && $gameScreen.picture(stand_ear)._name == FileName){}
		  else{
			  $gameScreen.showPicture(stand_ear,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);
			  if(!$dataArmors[eyeId].meta.noTone){
			  if(StandAltFlag >= 1) $gameScreen.picture(stand_ear)._tone = user.hairToneb;
			  else $gameScreen.picture(stand_ear)._tone = user.hairTone;}
		  }
	  }	
	  //避孕套
	  if(!$gameSwitches.value(2910)){$gameScreen.erasePicture(stand_byt);}
	  else{
		  FileName = 'BYT/' + StandPoseID + '_' + $gameVariables.value(4888);
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  if($gameScreen.picture(stand_byt) && $gameScreen.picture(stand_byt)._name == FileName){}
		  else{$gameScreen.showPicture(stand_byt,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //阴蒂环
	  if(ClitPicFileNum == 0){$gameScreen.erasePicture(stand_clitRing);}
	  else{
		  FileName = 'clit/' + StandPoseID + "_" + ClitPicFileNum;
		  if($gameScreen.picture(stand_clitRing) && $gameScreen.picture(stand_clitRing)._name == FileName){}
		  else{$gameScreen.showPicture(stand_clitRing,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //ピアスL
	  if(PiercePicFileNum == 0){$gameScreen.erasePicture(stand_pierceL);}
	  else{
		  FileName = 'nipple/' + StandPoseID + "_" + PiercePicFileNum;
		  if($gameScreen.picture(stand_pierceL) && $gameScreen.picture(stand_pierceL)._name == FileName){}
		  else{$gameScreen.showPicture(stand_pierceL,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //ピアスR
	  if(PiercePicFileNumR == 0){$gameScreen.erasePicture(stand_pierceR);}
	  else{
		  FileName = 'nipple/' + StandPoseID + "_" + PiercePicFileNumR;
		  if($gameScreen.picture(stand_pierceR) && $gameScreen.picture(stand_pierceR)._name == FileName){}
		  else{$gameScreen.showPicture(stand_pierceR,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //喷水
	  if(!$gameSwitches.value(2914)){$gameScreen.erasePicture(effect_splash);}
	  else{
		  FileName = BasePoseFileName + "_option_" + "0037";
		  if($gameScreen.picture(effect_splash) && $gameScreen.picture(effect_splash)._name == FileName){}
		  else{$gameScreen.showPicture(effect_splash,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //精液body
	  if(SemenBody < 1){$gameScreen.erasePicture(stand_semenbody);}
	  else{
		  if(SemenBody >= 15){var SemenBodyPicFileNum = "0006"}
		  else if(SemenBody >= 8){var SemenBodyPicFileNum = "0005"}
		  else{var SemenBodyPicFileNum = "0004"}
		  FileName = BasePoseFileName + "_semen_" + SemenBodyPicFileNum;
		  if($gameScreen.picture(stand_semenbody) && $gameScreen.picture(stand_semenbody)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenbody,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //精液face
	  if(SemenFace < 1){$gameScreen.erasePicture(stand_semenface);}
	  else{
		  if(SemenFace >= 15){var SemenFacePicFileNum = "0003"}
		  else if(SemenFace >= 8){var SemenFacePicFileNum = "0002"}
		  else{var SemenFacePicFileNum = "0001"}
		  FileName = BasePoseFileName + "_semen_" + SemenFacePicFileNum;
		  if($gameScreen.picture(stand_semenface) && $gameScreen.picture(stand_semenface)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenface,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //精液下体
	  if(SemenVagina < 1 && SemenAnus < 1){$gameScreen.erasePicture(stand_semenhole);}
	  else{
		  if(SemenVagina >= 1 && SemenAnus >= 1){var SemenHolePicFileNum = "0009"}
		  else if(SemenVagina >= 1 && SemenAnus == 0){var SemenHolePicFileNum = "0007"}
          else if(SemenVagina == 0 && SemenAnus >= 1){var SemenHolePicFileNum = "0008"}
          else{}
		  FileName = BasePoseFileName + "_semen_" + SemenHolePicFileNum;
		  if($gameScreen.picture(stand_semenhole) && $gameScreen.picture(stand_semenhole)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenhole,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //精液口
	  if(SemenMouth < 1){$gameScreen.erasePicture(stand_semenmouth);}
	  else{
		  FileName = BasePoseFileName + "_semen_" + "0010";
		  if($gameScreen.picture(stand_semenmouth) && $gameScreen.picture(stand_semenmouth)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenmouth,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
      //立ち絵エロ

      var BindType = $gameVariables.value(415)//拘束の相手種族
      var MouthStateID = $gameVariables.value(351)//口塞ぎの相手番号
      var VaginaStateID = $gameVariables.value(352)//前の相手番号
      var AnusStateID = $gameVariables.value(353)//後ろの相手番号
      var WaitStateID = $gameVariables.value(354)//挿入前相手番号
	  var OrganID = 0;//阴部番号
   
	  if(StandPoseID == 4){//4(拘束)
		if(BindType == 2){Dif1PicFileName = "tentacle";}
		else if(BindType == 1){Dif1PicFileName = "manhand";Dif2PicFileName = "man";}
		else if(BindType == 3){Dif1PicFileName = "tentaclewall";Dif2PicFileName = "tentaclewallback";}
		else if(BindType == 4){Dif1PicFileName = "worm";}
		//else if(BindType == 5){Dif1PicFileName = "demonhand";Dif2PicFileName = "demon";}
		else if(BindType == 10){Dif1PicFileName = "chain";}
		else if(BindType == 11){Dif1PicFileName = "tickle";}
		
	  }else if(StandPoseID == 5){//5(片足上げ)
		if(VaginaStateID == 2 && AnusStateID == 2 && MouthStateID == 2){Dif1PicFileName = "tentacle_07";}//触手三穴
		else if(VaginaStateID == 2 && AnusStateID == 2){Dif1PicFileName = "tentacle_04";}
		else if(VaginaStateID == 2 && MouthStateID == 2){Dif1PicFileName = "tentacle_05";}//触手口膣
		else if(AnusStateID == 2 && MouthStateID == 2){Dif1PicFileName = "tentacle_06";}//触手口尻
		else if(VaginaStateID == 2){Dif1PicFileName = "tentacle_02";}
		else if(AnusStateID == 2){Dif1PicFileName = "tentacle_03";}
		else if(BindType == 2){Dif1PicFileName = "tentacle_01";}
		else if(VaginaStateID == 1){Dif1PicFileName = "man01_penis_v";Dif2PicFileName = "man01";OrganID = 51;}
		else if(WaitStateID == 1){Dif1PicFileName = "man01_penis";Dif2PicFileName = "man01";}
		
	  }else if(StandPoseID == 6){//6(バック)
		if(VaginaStateID == 1){Dif1PicFileName = "man01";}
		else if(AnusStateID == 1){Dif1PicFileName = "man01";}
	  
      }else if(StandPoseID == 7){//7(二穴)
		if(VaginaStateID == 1 && AnusStateID == 1 && BindType == 10){Dif1PicFileName = "man01_hand02";Dif2PicFileName = "man01";}
		else if(VaginaStateID == 1 && BindType == 10){Dif1PicFileName = "man02_hand";Dif2PicFileName = "man02";}
		else if(VaginaStateID == 1 && AnusStateID == 1){Dif1PicFileName = "man01_hand";Dif2PicFileName = "man01";}
	  
      }else if(StandPoseID == 8){//8(開脚))
		if(VaginaStateID == 1 && AnusStateID == 1 && BindType == 9){Dif1PicFileName = "tentaclechair_w";;Dif2PicFileName = "tentaclechair";}
		else if(BindType == 9){Dif1PicFileName = "tentaclechair_f";;Dif2PicFileName = "tentaclechair";} 
		else if(BindType == 8){Dif1PicFileName = "tentaclehypnosis";}
		else if(AnusStateID == 1 && MouthStateID == 1 && VaginaStateID == 1){Dif1PicFileName = "penis_maa";;Dif2PicFileName = "man01";OrganID = 82;}      
		else if(VaginaStateID == 1 && MouthStateID == 1){Dif1PicFileName = "penis_m";;Dif2PicFileName = "man01";OrganID = 81;}
		else if(AnusStateID == 1 && MouthStateID == 1){Dif1PicFileName = "penis_ma";;Dif2PicFileName = "man01";}
		else if(VaginaStateID == 1){Dif1PicFileName = "man01_penis_v";;Dif2PicFileName = "man01";OrganID = 81;}
		else if(AnusStateID == 1){Dif1PicFileName = "man01_penis_a";;Dif2PicFileName = "man01";}
      
      }else if(StandPoseID == 9){//9(奉仕)
		if(MouthStateID == 1){Dif1PicFileName = "mouthhuman";}
		else if(MouthStateID == 2){Dif1PicFileName = "mouthtentacle";}
	  
	  }else if(StandPoseID == 10){//10倒地
		  if(VaginaStateID == 1){Dif1PicFileName = "man";}
      }else{}
	  
	  if(user.hasArmor($dataArmors[83]) && StandPoseID == 8 && VaginaStateID == 1) Dif1PicFileName += 'b';

	  if(VaginaStateID > 0) user.biriSocks();
	
	  if(StandPoseID <= 2){FileName = 'weapon/' + StandPoseID + '_' + weaponIndex; Dif1PicFileName = weaponIndex;}
	  else FileName = BasePoseFileName + "_sexual_" + Dif1PicFileName;
      if($gameScreen.picture(stand_diffront) && $gameScreen.picture(stand_diffront)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
      }else{
        if(Dif1PicFileName != 0){   
          $gameScreen.showPicture(stand_diffront,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0);
        }else{
          $gameScreen.erasePicture(stand_diffront)
        }
      }
	  
	  FileName = "organ/" + OrganID + 'v';
	  if($gameScreen.picture(stand_pv) && $gameScreen.picture(stand_pv)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
      }else{
        if(OrganID != 0){    
          $gameScreen.showPicture(stand_pv,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0)
		  if(!ConfigManager.noBlacken) $gameScreen.showPicture(stand_pvb,FileName+'b',origin,Stand1X,Stand1Y,scale,scale,((($gameVariables.value(1104)+$gameVariables.value(1106))*10+$gameVariables.value(1045))/2.5).clamp(0,160),0)
        }else{
          $gameScreen.erasePicture(stand_pv)
		  $gameScreen.erasePicture(stand_pvb)
        }
      }


      FileName = BasePoseFileName + "_sexual_" + Dif2PicFileName//ファイル名指定
      if($gameScreen.picture(stand_difback) && $gameScreen.picture(stand_difback)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
      }else{
        if(Dif2PicFileName != 0){    
          $gameScreen.showPicture(stand_difback,FileName,origin,Stand1X,Stand1Y,scale,scale,255,0)
        }else{
          $gameScreen.erasePicture(stand_difback)
        }
      }

      //アニメーション座標
      if (StandAnimeX != 0 || StandAnimeY != 0){
        $gameVariables._data[902] = Stand1X
        $gameVariables._data[903] = Stand1Y
        var StandMoveX = Stand1X
        var StandMoveY = Stand1Y
        StandMoveX = Stand1X + StandAnimeX
        StandMoveY = Stand1Y + StandAnimeY
        this.wait(5)

        //動かす処理
		for(var i = 0; i < stand_array.length; i++){
			MovePic(stand_array[i],Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		}
        this.wait(5)
      }
	  
	  //呼吸处理
	  if($gameScreen.picture(effect_breath)){
			if(!window.breathDir) window.breathDir = -5
			if(window.breathDir >= 0){
				window.breathDir -= 5;
				if(Math.abs(window.breathDir) < 10){
					window.breathDir = -40;
					$gameScreen.movePicture(effect_breath,origin,Stand1X,Stand1Y,scale,scale,180,0,20);
				}
			}else{
				window.breathDir += 5;
				if(Math.abs(window.breathDir) < 10){
					window.breathDir = 120;
					$gameScreen.movePicture(effect_breath,origin,Stand1X,Stand1Y,scale,scale,0,0,60);
				}
			}
		}
    };//おわり





	//消去コマンド
	if (command === 'ResetStandEro') {//消去1
		$gameVariables._data[912] = 0//強制指定解除
		$gameVariables._data[415] = 0//拘束相手
		$gameVariables._data[351] = 0//口
		$gameVariables._data[352] = 0//膣
		$gameVariables._data[353] = 0//尻
		$gameVariables._data[354] = 0//挿入まち
		$gameScreen.erasePicture(110)
		$gameScreen.erasePicture(143) //这俩为敌人图层
	}

    if (command === 'EraceStand1' || command === 'EraceStand') {//消去1
      for(var i = 34; i <= 59; i++){$gameScreen.erasePicture(i);}
	  for(var i = 110; i <= 150; i++){$gameScreen.erasePicture(i);}
    }
  

    if (command === 'TempEraceStand1' || command === 'イベント中一時立ち絵消去') {//消去1
      $gameSwitches._data[46] = true;
    }


    if (command === 'StandAnimation') {//アニメーションのみ
      var Stand1X = 450
      var Stand1Y = 50  
      if(args[0] != null){var StandAnimeX = Number(args[0])}else{var StandAnimeX = 0};//アニメーション座標X
      if(args[1] != null){var StandAnimeY = Number(args[1])}else{var StandAnimeY = 0};//アニメーション座標Y
      if(args[2] != null){var StandAnimeWait = Number(args[2])}else{var StandAnimeWait = 1};//アニメーションウェイト
      if (StandAnimeX != 0 || StandAnimeY != 0){
        var StandMoveX = Stand1X + StandAnimeX
        var StandMoveY = Stand1Y + StandAnimeY
		for(var i = 110; i <= 150; i++){
			MovePic(i,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		}
      }
    }
  };


  function MovePic(TempPicNum,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait) {
    if($gameScreen.picture(TempPicNum)){
      Torigoya.Tween.create($gameScreen.picture(TempPicNum))
      .to({_x: StandMoveX,_y: StandMoveY},StandAnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({_x: Stand1X,_y: Stand1Y},StandAnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
    }
  }


  function AutoFaceId(user) {
    if($gameSwitches.value(15) || $gameSwitches.value(34)){var FaceId = $gameVariables.value(895)}//イベント中or立ち絵エロ中はFaceIdで指定
    else{  
      var FaceId = 2    
      var Estrus = 35
	  var BigEstrus = 60
	  var OverEstrus = 61
      var Battle = 13
      var Extasy = 34
      var ShameSmile = 33
      var ShameUnhappy = 32
      var Shame = 31
      var Jito = 17
      var Joy = 5
      var Stern = 7
      var Yoin = 37
      var PokerFace = 2
      var MouthOpen = 25
      var Damage = 15
	  var Orgasm = 36
	  var BigOrgasm = 41
	  var Hyp = 38

      if(user._classId > 2){FaceId = 50;}//魅魔
	  else if($gameVariables.value(916) == 9 && $gameVariables.value(351) >= 1){FaceId = MouthOpen}//奉仕
	  else if(user.isStateAffected(164)){FaceId = BigOrgasm}//强绝顶
	  else if(user.isStateAffected(163)){FaceId = Orgasm}//弱绝顶
	  else if($gameVariables.value(1027) >= 150){FaceId = OverEstrus;}//界限発情中
	  else if($gameVariables.value(1027) >= 100){FaceId = BigEstrus;}//强発情中
	  else if($gameVariables.value(1027) >= 50 && $gameVariables.value(1026) >= $gameVariables.value(619)*0.5){FaceId = Estrus;}//発情中
	  else if(user.isStateAffected(165)){
		   if($gameVariables.value(1033) == 3) FaceId = 40;
		   else FaceId = 37;
	  }//绝顶余韵
      else if($gameVariables.value(1026) >= $gameVariables.value(619)*0.5){FaceId = Extasy}//快感高
      else if($gameVariables.value(1020) >= 1){FaceId = ShameUnhappy}//ぶっかけ
      else if(user.isStateAffected(28)){FaceId = Shame}//羞恥
      else if($gameParty.inBattle()){
        if($gameSwitches.value(38)){FaceId = Joy}//戦闘終了時
        else if($gameSwitches.value(170)){FaceId = Damage}//ダメージ
		else if($gameActors.actor(1).isStateAffected(410)){FaceId = Hyp}
        else{FaceId = Battle}//戦闘中
      }//暫定
	  else if(user.isStateAffected(220)){FaceId = Damage}//感情受伤
      else if(user.isStateAffected(219)){FaceId = Jito}//感情じとー
      else if(user.isStateAffected(216)){FaceId = Yoin}//感情余韻
      else if(user.isStateAffected(221)){FaceId = Shame}//感情羞恥
      else if($gameSwitches.value(228)){FaceId = Shame}//露出中オン
      else if($gameActors._data[1]._equips[1]._itemId == 0 && $dataMap.meta["PubricSpot"]){
        if($gameVariables.value(1021) >= 100){
          FaceId = ShameSmile
          }else{FaceId = Shame}
            }//全裸
	  else if(user.hp < user.mhp / 4){FaceId = 14}
      else if($dataMap.meta["EnemyBase"]){FaceId = Stern}//平常敵ダンジョン攻略中
      else{FaceId = PokerFace};//平常
    }
    $gameVariables._data[895] = FaceId //変数に代入しておく
    return FaceId    
  }




})();