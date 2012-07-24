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
from AppDelegate import *

class MobileController(NSObject):

  textfield = objc.IBOutlet()
  index = ""

  def init(self):
    self = super(MobileController, self).init()
    if self is None: return None
    nc = NSNotificationCenter.defaultCenter()
    # handle 'loading_dict'
    nc.addObserver_selector_name_object_( 
      self, "loadingDict", 'loading_dict', None)
    # handle 'loaded_dict'
    nc.addObserver_selector_name_object_( 
      self, "loadedDict", 'loaded_dict', None)
    return self

  def loadingDict( self ):
    NSLog("MobileController: dictionary loading in progress");
    self.disableButtons();

  def loadedDict( self ):
    NSLog("MobileController: dictionary loaded");
    self.enableButtons();

  @objc.IBAction
  def pressStar_(self, sender):
    NSLog(u"Star pressed"); 

  @objc.IBAction
  def press0_(self, sender):
    NSLog(u"Button 0 pressed"); 
    if self.index == "":
      return
    words = []
    for k in AppDelegate.T9Data.iterkeys():
      if k == int(self.index):
        words = AppDelegate.T9Data[k];

    words_str = "[" + (", ").join( words ) + "]";

    self.textfield.setStringValue_(self.textfield.stringValue() + " " +
      words_str ); #str( words ) )

    self.index = "" # reset self.index for the next user key sequence.

  @objc.IBAction
  def press1_(self, sender): # AKA press`1_
    NSLog(u"Button 1 pressed"); 
    self.index += "1"
    
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

  #def disableButtons(self):
    #self.keyButton0.setState_(NSOffState);

  #def enableButtons(self):
    #self.keyButton0.setState_(NSOnState);

