'use strict';
var file_name = "e5ojs-post-type.js";
console.log(file_name,"Module loaded...");

// e5ojs start local requires settings
var e5ojs_config = require("../e5ojs-config.js");
var e5ojs_counter = require('../model/e5ojs-counter.js');
var e5ojs_init = require("../model/e5ojs-init.js");
// e5ojs end local requires settings


// mongojs
var mongojs = require('mongojs');
var db = mongojs("e5ojs_db");




/* set function e5ojs_init and validate session as modules too for fix all */




/* start post type DB function */
exports.e5ojs_post_type_get_all = function e5ojs_post_type_get_all(callback) {
    db.e5ojs_post_type.find({'post_type_status':1},function(err,result_data){
        callback(result_data);
    });
}
exports.e5ojs_post_type_get_by_name = function e5ojs_post_type_get_by_name(post_type_name,callback) {
    db.e5ojs_post_type.find({'post_type_name':post_type_name},function(err,result_data){
        if( err )
            callback(null);
        else
            callback(result_data);
    });
}
exports.e5ojs_post_type_get_by_id = function e5ojs_post_type_get_by_id(post_type_id,callback) {
    db.e5ojs_post_type.find({'post_type_id':post_type_id},function(err,result_data){
        if( err )
            callback(null);
        else
            callback(result_data);
    });
}
exports.e5ojs_post_type = function e5ojs_post_type(post_type_id, callback) {
    db.e5ojs_post_type.find({'post_type_id':parseInt(post_type_id)},function(err,result_data){
        callback(result_data);
    });
}
exports.e5ojs_post_type_insert_new = function e5ojs_post_type_insert_new(post_type_data, callback) {
    // get increment e5ojs_media
    e5ojs_counter.e5ojs_get_next_id('post_type',function(data){
        // increment post_type counter
        var next_id = data.seq;
        post_type_data.post_type_id = parseInt(next_id);
        db.e5ojs_post_type.insert(post_type_data,function(err, result_data){
            e5ojs_init.e5ojs_init(function(){
                callback(result_data);
            });
        });
    });
}
exports.e5ojs_post_type_update = function e5ojs_post_type_update(post_type_data, callback) {
    // update post type data
    // get current post type metas
    //db.e5ojs_post_type.find({'post_type_id':parseInt(post_type_data.post_type_id)},function(err, current_post_type){
        db.e5ojs_post_type.update({'post_type_id':parseInt(post_type_data.post_type_id)},{$set:post_type_data},{new:false},function(err,result_data){
            e5ojs_init.e5ojs_init(function(){
                callback(result_data);
            });
        });
    //});
}
exports.e5ojs_post_type_delete = function e5ojs_post_type_delete(post_type_id, callback) {
    // find post type by id and drop
    db.e5ojs_post_type.remove({'post_type_id':parseInt(post_type_id)},function(err,result_data){
        e5ojs_init.e5ojs_init(function(){
            callback(result_data);
        });
    });
}
exports.e5ojs_change_post_type_status_multiple = function e5ojs_change_post_type_status_multiple(post_ids,status,callback) {
    var ids_array = Array();
    post_ids.forEach(function(val,key){
        ids_array.push( parseInt(post_ids[key]) );
    });
    db.e5ojs_post_type.update({'post_type_id':{$in:ids_array}},{$set:{'post_type_status':parseInt(status)}},{new: false,multi: true},function(err, result_data){
        // result : WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
        if( err ) {
            callback({ok:0});
        } else {
            if( result_data.nModified > 0 ) {
                e5ojs_init.e5ojs_init(function(){
                    callback({status:1});
                });
            } else {
                e5ojs_init.e5ojs_init(function(){
                    callback({status:0});
                });
            }
        }
    });
}
exports.e5ojs_remove_post_type_status_multiple = function e5ojs_remove_post_type_status_multiple(post_ids,callback) {
    var ids_array = Array();
    post_ids.forEach(function(val,key){
        ids_array.push( parseInt(post_ids[key]) );
    });
    db.e5ojs_post_type.remove({'post_type_id':{$in:ids_array}},function(err, result_data){
        // result : WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
        if( err ) {
            callback({ok:0});
        } else {
            if( result_data.nModified > 0 ) {
                e5ojs_init.e5ojs_init(function(){
                    callback({status:1});
                });
            } else {
                e5ojs_init.e5ojs_init(function(){
                    callback({status:0});
                });
            }
        }
    });
}
/* end post type DB function */
