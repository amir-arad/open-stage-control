module.exports = (self, element)=>{

    var sendTouchState = self.getProp('touchAddress') && self.getProp('touchAddress').length

    self.touched = 0
    self.setValueTouchedQueue = undefined

    element.on('draginit',(e)=>{
        self.touched += 1
        if (self.touched == 1 && sendTouchState)
            self.sendValue({
                address:self.getProp('touchAddress'),
                v:1,
                split:false
            })
    })

    element.on('dragend', (e, data, traversing)=>{
        if (self.touched == 1) {
            self.touched = 0

            if (self.setValueTouchedQueue !== undefined) {
                self.setValue(...self.setValueTouchedQueue)
                self.setValueTouchedQueue = undefined
            }

            if (sendTouchState) {
                self.sendValue({
                    address:self.getProp('touchAddress'),
                    v:0,
                    split:false
                })
            }

        } else if (self.touched > 1){
            self.touched -= 1
            if (traversing) self.touched = 1
        }
    })

}
