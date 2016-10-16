<div class="menu_block left" id="mainMenu">
  <div class="tools_block left">      
    <a href="javascript: void(0)">
      <img id="pencil" class="button" src="images/pencil.png" alt="pencil">
    </a>
    <a href="javascript: void(0)">
      <img id="eraser" class="button" src="images/eraser.png" alt="eraser">
    </a>
    <h3>Инструменты</h3>
  </div>
  <div class="tools_block left">
    <a href="javascript: void(0)">
      <img id="rectangle" class="button left" src="images/rectangle.png" alt="rectangle">
    </a>    
    <a href="javascript: void(0)">
      <img id="ellipse" class="button left" src="images/ellipse.png" alt="ellipse"> 
    </a>
    <div class="right">
      <button id="navItemStroke" class="pointer_list">
        <img src="images/stroke.png" alt="stroke">
        Контур
        <img src="images/arrow.png" alt="arrow">
      </button>
        
      <button id="navItemFill" class="pointer_list">
        <img src="images/fill.png" alt="fill">
        Заливка
        <img src="images/arrow.png" alt="arrow">
      </button>
    </div>  
    <div class="clear"></div>
    <h3>Фигуры</h3>
    <div class="navList" id="navListStroke">
      <button class="navItemStokeStyle pointer" id="navItemStokeStyleWithout">
        <img src="images/withoutFilling.png" alt="withoutFilling">
        Без контура
      </button>
      <button class="navItemStokeStyle pointer" id="navItemStokeStyleWith">
        <img src="images/withFilling.png" alt="withoutFilling">
        Сплошной цвет
      </button>
    </div>
    <div class="navList" id="navListFilling">
      <button class="navItemFillStyle pointer" id="navItemFillStyleWithout">
        <img src="images/withoutFilling.png" alt="withoutFilling">
        Без заливки
      </button>
      <button class="navItemFillStyle pointer" id="navItemFillStyleWith">
        <img src="images/withFilling.png" alt="withoutFilling">
        Сплошной цвет
      </button>
    </div>
  </div>
  <div class="tools_block left">
    <button id="navItemLineWidth" class="pointer_list">
      <img src="images/line-width.png" alt="line-width">
      <span>Толщина</span>
      <img src="images/arrow.png" alt="arrow">
    </button>
    <div class="navList" id="navListLineWidth">
      <button class="navItemPixel pointer" id="navItemPixel1">
        <div class="linewidth-bttn" id="pixel1"></div>
      </button>
      <button class="navItemPixel pointer" id="navItemPixel3">
        <div class="linewidth-bttn" id="pixel3"></div>
      </button>
      <button class="navItemPixel pointer" id="navItemPixel5">
        <div class="linewidth-bttn" id="pixel5"></div>
      </button>
      <button class="navItemPixel pointer" id="navItemPixel8">
        <div class="linewidth-bttn" id="pixel8"></div>
      </button>
    </div>
  </div>
  <div class="tools_block left">  
    <div class="button colorBttn pointer" id="color1">
      <div class="left">цвет 1</div>
      <div class="picker right" id="picker"></div>
      <div class="clear"></div>
    </div>
    <div class="button colorBttn pointer" id="color2">
      <div class="left">цвет 2</div>
      <div class="picker right" id="picker2"></div>
      <div class="clear"></div>
    </div>
    
    <h3>Цвета</h3>
    
  </div>
  <?php 
      include("defaultColors.php")
  ?> 
  <div class="clear"></div>
</div>