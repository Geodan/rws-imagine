function show3D()
{
    $('imagine-puzzel').remove();
    $('#firstScreen').show();
    $('#secondScreen').hide();
    u.getUnity().SendMessage("View", "ToggleEnable", "");  

}

function show2D()
{
    if($('imagine-puzzel').length == 0) $('#secondScreen').after('<imagine-puzzel></imagine-puzzel>');
    $('#firstScreen').slideUp();
    $('#secondScreen').show();
    $('imagine-puzzel').attr('start',true);
    //$('imagine-time-slider-vertical')
}

function SayHelloToBrowser()
{
   show2D();
}
