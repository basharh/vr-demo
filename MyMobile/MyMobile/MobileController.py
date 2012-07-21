#-*- coding: utf-8 -*-
#
#  MobileController.py
#  MyMobile
#
#  Created by Lemir B El Harfouche on 7/20/12.
#  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
#

import objc
from Foundation import *

class MobileController(NSObject):
  data = { 
      7764726:  ["program"], 
      263:      ["and", "cod"],
      786:      ["pun", "quo", "rum", "run", "sum", "sun"],
      8447:     ["this"],
      746753:   ["simple"],
      8378:     ["test", "vest"] 
  }
  textfield = objc.IBOutlet()
  #index = "" # Stores the latest entered key sequence
  #index = 263
  index = ""

  @objc.IBAction
  def press0_(self, sender):
    NSLog(u"Button 0 pressed"); 
    if self.index == "":
      return
    for k in self.data.iterkeys():
      if k == int(self.index):
        #words = "[" + (", ").join(self.data[k]) + "] "
        words = self.textfield.stringValue() + "[" + (", ").join(self.data[k]) + "] "
        self.textfield.setStringValue_(words)
    self.index = ""
    
  @objc.IBAction
  def pressABC2_(self, sender):
    NSLog(u"Button 2 pressed"); 
    self.index += "2"

  @objc.IBAction
  def pressDEF3_(self, sender):
    NSLog(u"Button 3 pressed"); 
    self.index += "3"

  @objc.IBAction
  def pressGHI4_(self, sender):
    NSLog(u"Button 4 pressed"); 
    self.index += "4"

  @objc.IBAction
  def pressJKL5_(self, sender):
    NSLog(u"Button 5 pressed"); 
    self.index += "5"

  @objc.IBAction
  def pressMNO6_(self, sender):
    NSLog(u"Button 6 pressed"); 
    self.index += "6"

  @objc.IBAction
  def pressPQRS7_(self, sender):
    NSLog(u"Button 7 pressed"); 
    self.index += "7"

  @objc.IBAction
  def pressTUV8_(self, sender):
    NSLog(u"Button 8 pressed"); 
    self.index += "8"

  @objc.IBAction
  def pressWXYZ9_(self, sender):
    NSLog(u"Button 9 pressed"); 
    self.index += "9"
