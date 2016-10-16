function isLeftMouseDown(e)
{
    if (!e.which && e.button & 1 || e.which === 1)
    {
        return true;
    }
    return false;
}